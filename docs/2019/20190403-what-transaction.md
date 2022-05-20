---
create: '2019-04-03'
update: '2019-12-04'
title: 'Day 18: トランザクションとは'
tags: [cebu, ruby, mysql]
published: true
---

- [Qiita: トランザクションって](https://qiita.com/OriverK/items/2359c9159b55c74f15d1)

## What is Transaction like?

コンピュータ内で実行される、分けることのできない一連の情報処理の一単位。

トランザクション処理における永続性記憶資源の管理では、複数のデータ項目の更新操作列をすべて実行するか、まったく実行しないように制御する必要がある。

### ACID 標準

また、トランザクション処理システムは 4 つの属性の機能をサポートしており、頭文字から ACID 標準という。

- A : Atomic　不可分性
- C : Consistency　一貫性
- I : Isolation　独立性
- D : Durability　永続性

## 実際に動かしてみる

### DB内で操作

- 参照: [13.3.1 START TRANSACTION、COMMIT、および ROLLBACK 構文　-MySQLリファレンス](https://dev.mysql.com/doc/refman/5.6/ja/commit.html)

MySQL はデフォルトで、自動コミットモードが有効になった状態で動作し、実行するとすぐに、ディスクに格納されて永続的になります。この変更はロールバックできない。

自動コミットモードを暗黙的に無効にするには、START TRANSACTION をし、その後、COMMIT または ROLLBACK で終了するまで、自動コミットは無効のままになります。そのあと、自動コミットモードはその以前の状態に戻ります。

#### 実作業

今回は MySQL と、以前に作成した大学生徒データ App のデータを再利用する

```sh
mysql -u root -p
```

```sql
-- 使用するデータベース情報の選択
USE cebu_college_development;

-- 使用するstudentsテーブルの構造を確認
DESC students;
-- +------------+--------------+------+-----+---------+----------------+
-- | Field      | Type         | Null | Key | Default | Extra          |
-- +------------+--------------+------+-----+---------+----------------+
-- | id         | bigint(20)   | NO   | PRI | NULL    | auto_increment |
-- | name       | varchar(255) | YES  |     | NULL    |                |
-- | email      | varchar(255) | YES  |     | NULL    |                |
-- | gender     | int(11)      | YES  |     | NULL    |                |
-- | age        | int(11)      | YES  |     | NULL    |                |
-- | opinion    | text         | YES  |     | NULL    |                |
-- | created_at | datetime     | NO   |     | NULL    |                |
-- | updated_at | datetime     | NO   |     | NULL    |                |
-- +------------+--------------+------+-----+---------+----------------+
```

```sql
-- id=3のtaro-2さんを使ってみる
SELECT name FROM students WHERE id = 3;
-- +--------+
-- | name   |
-- +--------+
-- | taro-2 |
-- +--------+
```

##### COMMITするパターン

```sql
START TRANSACTION;

-- id=3のnameを"tran-sakuko"に更新
UPDATE students SET name = "tran-sakuko" WHERE id = 3;
-- Query OK, 1 row affected (0.01 sec)
-- Rows matched: 1  Changed: 1  Warnings: 0

SELECT name FROM students WHERE id =3;
-- +-------------+
-- | name        |
-- +-------------+
-- | tran-sakuko |
-- +-------------+

-- コミットする
COMMIT;
-- Query OK, 0 rows affected (0.00 sec)

-- COMMITされてるか確認
-- select name from students where id =3;
-- +-------------+
-- | name        |
-- +-------------+
-- | tran-sakuko |
-- +-------------+
-- 1 row in set (0.00 sec)
```

##### ROLLBACKするパターン

```sql
START TRANSACTION;
-- Query OK, 0 rows affected (0.00 sec)

-- id=3のnameを"tran sakutarou"に更新
UPDATE students SET name = "tran sakutarou" WHERE id =3;
-- Query OK, 1 row affected (0.00 sec)
Rows matched: 1  Changed: 1  Warnings: 0

-- id3のnameに新しいデータの"tran sakutarou"がセットされてる
SELECT name FROM students WHERE id = 3;
-- +----------------+
-- | name           |
-- +----------------+
-- | tran sakutarou |
-- +----------------+

-- ロールバックしてみる
ROLLBACK;
-- Query OK, 0 rows affected (0.01 sec)

-- セットした"trans sakutarou"というデータはDBに格納されない。
SELECT name FROM students WHERE id = 3;
-- +-------------+
-- | name        |
-- +-------------+
-- | tran-sakuko |
-- +-------------+
```

### try on RubyonRails

新しく、アプリを作成する。今回は DB の操作だけなので、rails g model コマンドのみ使用。テーブルは User と Review の２つ。

```sh
rails new transact_self -d mysql
# database.ymlを編集後
rails db:create
# Userモデル作成
rails g model User name:string approved:boolean deleted:boolean
# Reviewモデル作成
rails g model Review user:references rate:integer approved:boolean
rails db:migrate
```

```rb
# input data
# user
(1..5).each do |i|
  User.create(name: "taro-#{i}", approved: true, deleted: false)
end

(1..5).each do |i|
  user = User.first
  Review.create!(user_id: user.id, rate: i, approved: true)
end
```

DB 内で確認

```sql
SELECT * FROM users;
-- +----+--------+----------+---------+---------------------+---------------------+
-- | id | name   | approved | deleted | created_at          | updated_at          |
-- +----+--------+----------+---------+---------------------+---------------------+
-- |  1 | taro-1 |        1 |       0 | 2019-04-03 09:01:31 | 2019-04-03 09:01:31 |
-- |  2 | taro-2 |        1 |       0 | 2019-04-03 09:01:31 | 2019-04-03 09:01:31 |
-- |  3 | taro-3 |        1 |       0 | 2019-04-03 09:01:31 | 2019-04-03 09:01:31 |
-- ...

SELECT * FROM reviews;
-- +----+---------+------+----------+---------------------+---------------------+
-- | id | user_id | rate | approved | created_at          | updated_at          |
-- +----+---------+------+----------+---------------------+---------------------+
-- |  1 |       1 |    1 |        1 | 2019-04-03 09:01:38 | 2019-04-03 09:01:38 |
-- |  2 |       1 |    2 |        1 | 2019-04-03 09:01:38 | 2019-04-03 09:01:38 |
-- |  3 |       1 |    3 |        1 | 2019-04-03 09:01:38 | 2019-04-03 09:01:38 |
-- ...
```

user と review との、関連付け

```rb:app/models/user.rb
class User < ApplicationRecord
  has_many :reviews
end
```

review モデルに validation 追加
approved カラムを空欄不可にしておく。

```rb:app/models/review.rb
class Review < ApplicationRecord
  belongs_to :user
  validates :approved, presence: true
end
```

#### コンソールで、トランザクション処理の挙動を確認

トランザクション処理に成功し、commit されるパターン

```rb
user = User.first
User.transaction do
  user.update!(approved: false)
  user.reviews.each { |review| review.update!(approved: true) }
end

# =>(0.1ms)  BEGIN
#   User Update (0.3ms)  UPDATE `users` SET `approved` = FALSE, `updated_at` = '2019-04-03 09:10:46' WHERE `users`.`id` = 1
#   Review Load (0.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`user_id` = 1
#    (6.8ms)  COMMIT
# => <Review id: 1, user_id: 1, rate: 1, approved: true, created_at: "2019-04-03 09:01:38", updated_at: "2019-04-03 09:01:38">, 
#<Review id: 2, user_id: 1, rate: 2,approved: true, created_at: "2019-04-03 09:01:38", updated_at: "2019-04-03 09:01:38">, 
#<Review id: 3, user_id: 1, rate: 3, approved: true, created_at: "2019-04-03 09:01:38", updated_at: "2019-04-03 09:01:38">,
```

user テーブルの id1 の taro-1 が、更新されてる

```sql
select * from users;
-- +----+--------+----------+---------+---------------------+---------------------+
-- | id | name   | approved | deleted | created_at          | updated_at          |
-- +----+--------+----------+---------+---------------------+---------------------+
-- |  1 | taro-1 |        0 |       0 | 2019-04-03 09:01:31 | 2019-04-03 09:10:46 |
```

トランザクション処理に失敗し、rollback されるパターン

```rb
user = User.first
User.transaction do
  user.update!(approved: true)
  user.reviews.each { |review| review.update!(approved: false) }
end
=>(0.1ms)  BEGIN
  User Update (0.2ms)  UPDATE `users` SET `approved` = TRUE, `updated_at` = '2019-04-03 09:14:44' WHERE `users`.`id` = 1
  Review Load (0.2ms)  SELECT `reviews`.* FROM `reviews` WHERE `reviews`.`user_id` = 1
   (6.6ms)  ROLLBACK
Traceback (most recent call last):
        3: from (irb):2
        2: from (irb):4:in `block in irb_binding'
        1: from (irb):4:in `block (2 levels) in irb_binding'
ActiveRecord::RecordInvalid (Validation failed: Approved can't be blank)
```

トランザクション処理に失敗し、rollback したため、DB に変化はない。

#### modelファイルを編集して実装

```rb:app/models/user.rb
class User < ApplicationRecord
  has_many :reviews

  def suspend!
    self.class.transaction do
      disapprove_user!
      disapprove_reviews!
    end
  end

private
  def disapprove_user!
    self.update!(approved: false)
  end
  def disapprove_reviews!
    reviews.each { |review| review.update!(approved: false) }
  end
end
```

## 参照

- [「トランザクション」とは何か？を超わかりやすく語ってみた！](https://qiita.com/zd6ir7/items/6568b6c3efc5d6a13865)
