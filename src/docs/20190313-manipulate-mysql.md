---
create: '2019-03-13'
update: '2019-12-04'
author: Kawano Yudai
title: 'Qiita: 6,7日目： MySQL 操作'
tags: [Qiita, MySQL]
---

- from Qiita:
  - [6日目：MySQL操作](https://qiita.com/OriverK/items/8c35aae3cbe05a1a28ce)
  - [7日目(1)：MySQLの操作](https://qiita.com/OriverK/items/cb697d8dec5c45b8c7f2)


今日の授業は、Railsを使わず、MySQLのみでデータ入力、操作する内容でした。

## テーブル同士の関係Association
### belong_to : 1対1の関係
(例)　exam_result(試験点数) belong_to student
      とある教科の試験の点数は、特定の1人の生徒に帰属
### has many : 1対多の関係
(例)　student has many exam_result
　　　生徒は複数の試験を受けるので。
### many to many :多対多の関係
(例)  学生と部活の関係。学生は複数の部活に所属し、1つの部活には複数の学生が所属。
　　　当然、まったく所属していない学生も居る可能性がある

```sh
| 生徒 | 部活１ | 部活２ | 部活３ | 部活4 |
|:-:|:-:|:-:|:-:|:-:|
| Aさん  | 自転車部  | 軽音部  | 水泳部  | バスケ部  |
| Bさん  |   |   |   |   |
| Cさん  | 茶道部  | 華道部  | 水泳部 |   |
| Dさん |茶道部|軽音部|||
```

#### 多対多テーブルの問題
DB上では1つのカラムに複数のデータは入れることが出来ない。
上の表では、同義のカラム（部活１、部活2．。。）を増やしているが、
データベースでは、これを2次元で表現することができない

#### 解決法：中間テーブル(/関連テーブル)、
まず、生徒と部活にIDを持たせる

```sh
| 生徒 | 生徒ID |
|:-:|:-:|
| Aさん  | 1  |
| Bさん  | 2  |
| Cさん  | 3  |
| Dさん  | 4  |

| 部活 | 部活ID |
|:-:|:-:|
| 自転車部  | 1  |
| 茶道部  | 2  |
| 水泳部  | 3  |
# ...

中間テーブル

| 生徒ID | 部活ID |
|:-:|:-:|
| 1  | 1  |
| 1  | 3  |
| 1  | 4  |
# ...
```

実際にDBで触るときは、生徒テーブルと中間テーブルをJOINし、さらに中間テーブルと部活テーブルをJOINする

## 使うデータ
- データベース: univ
- 生徒テーブル: students
    - name, grade, email, age, gender, others, created_at, updated_at
- 試験結果テーブル: exam_results
    - name, student_id, score, max_score, created_at, updated_at

## 本題：MySQL操作 CREATE DATABASE
### データベース作成
```sql
CREATE DATABASE データベース名;
CREATE DATABASE univ;
CREATE TABLE
-- テーブル名は複数形で。
```

```sql
-- CREATE TABLE `students`(`カラム名`　データ型　その他指定, `カラム名`　データ型　その他指定, ...);
CREATE TABLE `students`(
`id` INT NOT NULL PRIMARY KEY  AUTO_INCREMENT,
`name` VARCHAR(255) NOT NULL,
`grade` INT(128) NOT NULL,
`email` VARCHAR(255) NOT NULL,
`age` INT(128) NOT NULL,
`gender` INT(128) NOT NULL,
`others` TEXT,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

#### バッククォートとシングルクォート
- バッククォート：テーブル名に使う
- シングルクォート：データの文字列に使う

**但し、バッククォートは必須ではない**
バッククォートよって、テーブル名やカラム名で使用できないように指定されている予約語（Reserved Words）を使えるようにできる。が、使わない方が良い。

- 参照：[phpMyAdminのSQLに付加される「'」に似た記号「`」は何？](https://php1st.com/1184/)

#### PRIMARY KEY、AUTO_INCREMENT
- PRIMARY KEY
  - 主キーの意。なお、外部キーはforeign key
- AUTO_INCREMENT
  - 値が指定しないと、自動的にシーケンス番号を割り当てられる。整数型で、1ずつ増加し連番。

#### MySQLのデータ型
- INT : 整数型（他にも、TINYINT < SMALLINT < MEDIUMINT < INT < BIGINT
- CHAR : 文字型（似たようなのには、VARCHARがある。）
- TIMESTAMP : 日付時刻型（'YYYY-MM-DD HH:MM:SS'）
- 入力するデータ量に従って、最適なデータ型を選んだ方が、色々と良いようだ。
  - [参照：MySQL 5.6 リファレンスマニュアル  /  データ型](https://dev.mysql.com/doc/refman/5.6/ja/data-types.html)

### DESC :テーブル情報の確認(Describeの略
```sql
DESC students;
-- 結果
+------------+--------------+------+-----+-------------------+----------------+
| Field      | Type         | Null | Key | Default           | Extra          |
+------------+--------------+------+-----+-------------------+----------------+
| id         | int(11)      | NO   | PRI | NULL              | auto_increment |
| name       | varchar(255) | NO   |     | NULL              |                |
| grade      | int(128)     | NO   |     | NULL              |                |
| email      | varchar(255) | NO   |     | NULL              |                |
| age        | int(128)     | NO   |     | NULL              |                |
| gender     | int(128)     | NO   |     | NULL              |                |
| others     | text         | YES  |     | NULL              |                |
| created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
| updated_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+------------+--------------+------+-----+-------------------+----------------+
```

同様に、exam_resultsテーブルも作成

```sql
CREATE TABLE `exam_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
　`student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` int(128) NOT NULL,
  `max_score` int(128) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8

DESC subjects;

-- 結果
DESC exam_results;
+------------+--------------+------+-----+-------------------+----------------+
| Field      | Type         | Null | Key | Default           | Extra          |
+------------+--------------+------+-----+-------------------+----------------+
| id         | int(11)      | NO   | PRI | NULL              | auto_increment |
| student_id | int(11)      | NO   |     | NULL              |                |
| name       | varchar(255) | NO   |     | NULL              |                |
| score      | int(128)     | NO   |     | NULL              |                |
| max_score  | int(128)     | NO   |     | NULL              |                |
| created_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
| updated_at | timestamp    | NO   |     | CURRENT_TIMESTAMP |                |
+------------+--------------+------+-----+-------------------+----------------+
```

#### ALTER TABLE :カラム変更
```sql
ALTER TABLE テーブル名 ADD COLUMN カラム名 カラム定義,
                      DROP COLUMN カラム名,
                      CHANGE COLUMN 変えるカラム名 新しいカラム名 カラム定義,
                      MODIFY COLUMN カラム名 新しいカラム定義;
```

### INSERT INTO :データ追加
```sql
-- INSERT INTO テーブル名 (カラム1, カラム2, カラム3, ...) 
VALUE (カラム1データ, カラム2データ, カラム3データ, ...),(カラム1データ, ........);

-- students生徒テーブル
INSERT INTO students (name, grade,email, age, gender, others, created_at, updated_at ) value('taro',1, 'taro@email',23,0,'nothing_special',NOW(),NOW()), ('oriver',3, 'oriver@email',25,1,'別に',NOW(),NOW()),('yuki',1, 'jo@gmail.com', 20, 1, 'こんにちは、備考です。', now(), now());

-- SELECT * FROM tables;で見る
+----+--------+-------+--------------+-----+--------+-----------------------------------+---------------------+---------------------+
| id | name   | grade | email        | age | gender | others                            | created_at          | updated_at          |
+----+--------+-------+--------------+-----+--------+-----------------------------------+---------------------+---------------------+
| 14 | taro   |     1 | taro@email   |  23 |      0 | nothing_special                   | 2019-03-12 22:58:04 | 2019-03-12 22:58:04 |
| 15 | oriver |     3 | oriver@email |  25 |      1 | 別に                              | 2019-03-12 22:58:04 | 2019-03-12 22:58:04 |
| 16 | yuki   |     1 | jo@gmail.com |  20 |      1 | こんにちは、備考です。            | 2019-03-12 22:58:04 | 2019-03-12 22:58:04 |
+----+--------+-------+--------------+-----+--------+-----------------------------------+-
```

```sql
-- exam_results試験結果テーブル
INSERT INTO exam_results (student_id,name, score, max_score, created_at, updated_at ) value 
(14,'育種学',65,100,NOW(),NOW()),(14,'技術者倫理',70,100,NOW(),NOW()),(14,'農業機械',89,100,NOW(),NOW()),(14,'植物病理学',91,100,NOW(),NOW()),(14,'応用昆虫学',66,100,NOW(),NOW()),
(15,'育種学',83,100,NOW(),NOW()),(15,'技術者倫理',74,100,NOW(),NOW()),(15,'農業機械',56,100,NOW(),NOW()),(15,'植物病理学',45,100,NOW(),NOW()),(15,'応用昆虫学',72,100,NOW(),NOW()),
(16,'育種学',72,100,NOW(),NOW()),(16,'技術者倫理',83,100,NOW(),NOW()),(16,'農業機械',69,100,NOW(),NOW()),(16,'植物病理学',99,100,NOW(),NOW()),(16,'応用昆虫学',69,100,NOW(),NOW());

-- 結果
+----+------------+-----------------+-------+-----------+---------------------+---------------------+
| id | student_id | name            | score | max_score | created_at          | updated_at          |
+----+------------+-----------------+-------+-----------+---------------------+---------------------+
| 51 |         14 | 育種学          |    65 |       100 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 52 |         14 | 技術者倫理      |    70 |       100 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 53 |         14 | 農業機械        |    89 |       100 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 54 |         14 | 植物病理学      |    91 |       100 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
-- ...
```

### UPDATE SET WHERE:テーブル情報の更新
今の時点では、max_scoreが100点だが、200点満点に変更してみる

```sql
-- UPDATE テーブル名 SET カラム名 = 新しい情報 WHERE 条件
UPDATE exam_results SET max_score = 200;
# 結果
+----+------------+-----------------+-------+-----------+---------------------+---------------------+
| id | student_id | name            | score | max_score | created_at          | updated_at          |
+----+------------+-----------------+-------+-----------+---------------------+---------------------+
| 51 |         14 | 育種学          |    65 |       200 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 52 |         14 | 技術者倫理      |    70 |       200 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 53 |         14 | 農業機械        |    89 |       200 | 2019-03-12 23:01:58 | 2019-03-12 23:01:58 |
| 54 |         14 | 植物病理学      |    91 |       200 | 2019-03-12 23:01:58 | 2019-03-12 2
-- ...
```

### JOIN :複数テーブル結合
#### 基本構文
```sql
SELECT table1.column1, table1.column2
       table2,column1
FROM table1
INNER JOIN table2
     ON table1.primary_key = table2.foreign_key
```

#### INNER JOIN と　OUTER JOIN
- INNER JOIN : 内部結合の意。
  - 主キー＝外部キーになるところだけ表示
  - 結合できなかったレコードは表示しない

- outer join :外部結合
    - 結合できなかったレコードは、NULLで表示
    - LEFT JOIN :主キー側のテーブルに合わせて表示
    - RIGHT JOIN :外部キー側のテーブルに合わせて表示

#### INNER JOINで結合してみる
students生徒テーブルとexam_results試験結果の、主キーと外部キーを使って結合

```sql
SELECT students.name, students.grade, students.gender, 
       exam_results.name, exam_results.score
FROM students
INNER JOIN exam_results
ON students.id = exam_results.student_id;

-- 結果
+--------+-------+--------+-----------------+-------+
| name   | grade | gender | name            | score |
+--------+-------+--------+-----------------+-------+
| taro   |     1 |      0 | 育種学          |    65 |
| taro   |     1 |      0 | 技術者倫理      |    70 |
| taro   |     1 |      0 | 農業機械        |    89 |
| taro   |     1 |      0 | 植物病理学      |    91 |
| taro   |     1 |      0 | 応用昆虫学      |    66 |
| oriver |     3 |      1 | 育種学          |    83 |
-- ...
```

### データ削除
#### テーブル情報の削除
```sql
-- DELETE FROM テーブル名 WHERE 条件;
DELETE FROM students;
DELETE FROM exam_results;
```

#### テーブルの削除
```sql
-- DROP TABLE テーブル名;
DROP TABLE students;
DROP TABLE exam_results;
```

#### データベースの削除
```sql
-- DROP DATABASE データベース名;
DROP DATABASE univ;
```

---

## 7日目

## データベースとテーブル作成、データ追加
### データベース作成
```sql
CREATE DATABASE univ1;
```

### テーブル作成
```sql
USE univ1_development;
-- 生徒テーブル作成
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `grade` int(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `age` int(128) NOT NULL,
  `gender` int(128) NOT NULL,
  `others` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- 生徒テーブルにデータ追加
INSERT INTO students (name, grade, email, age, gender, others, created_at, updated_at) VALUE ('じょじ',1, 'jo@gmail.com', 20, 0, 'こんにちは、備考です。', now(), now()),('yuka',2, 'yuka@email', 22, 1,'特に',now(),now()),('なつこ',1, 'natsu@email', 28, 1,'夏来たれ',now(),now()), ('おりば',3,'oriver@email',23,0,'nothing',now(),now()),('masaya',2,'masaya@email',20,0,'nothing',now(),now());
```

```sql
-- 試験結果テーブル作成
CREATE TABLE `exam_results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `score` int(128) NOT NULL,
  `max_score` int(128) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- 試験結果テーブルにデータ追加
INSERT INTO exam_results (name, student_id, score, max_score, created_at, updated_at) VALUE  ('物理', 12, 85, 100, now(), now()), ('数学', 12 ,64, 100, now(), now()), ('化学', 12 ,55, 100, now(), now()),('物理',13 ,85, 100, now(), now()), ('数学',13 ,65, 100, now(), now()), ('化学',13, 71, 100, now(), now()),('物理',14 ,88, 100, now(), now()), ('数学',14 ,73, 100, now(), now()), ('化学',14, 67, 100, now(), now()),('物理',15 ,100, 100, now(), now()), ('数学',15 ,92, 100, now(), now()), ('化学',15, 99, 100, now(), now()),('物理',16 ,30, 100, now(), now()), ('数学',16 ,43, 100, now(), now()), ('化学',16, 99, 100, now(), now());
```

```sql
-- 部活テーブル作成
CREATE TABLE `clubs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- 部活テーブルにデータ追加
INSERT INTO clubs (name, created_at, updated_at) VALUE 
('サッカー', now(), now()),('野球', now(), now()),('囲碁', now(), now()),('空手', now(), now()),('合気道', now(), now()),('自転車',now(),now()),('軽音',now(),now());
```

```sql
-- 生徒ー部活関連テーブル作成
CREATE TABLE `club_students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `student_id` int(11) NOT NULL,
  `club_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
)

-- 生徒ー部活関連テーブルへデータ追加
INSERT INTO club_students (student_id, club_id, created_at, updated_at) VALUE  (12, 1, now(), now()),(12, 3, now(), now()),(12, 5, now(), now()),(12, 7, now(), now());
INSERT INTO club_students (student_id, club_id, created_at, updated_at) VALUE  (13, 2, now(), now()),(13, 4, now(), now()),(13, 6, now(), now());
INSERT INTO club_students (student_id, club_id, created_at, updated_at) VALUE  (14, 1, now(), now()),(14, 3, now(), now()),(14, 4, now(), now()),(14, 5, now(), now());
INSERT INTO club_students (student_id, club_id, created_at, updated_at) VALUE 
(15, 4, now(), now()),(15, 5, now(), now()),(15 ,6, now(), now()),(15, 4, now(), now());
```

## 本題：MySQL操作
### scoreの最高、最小、平均、(score / max_score)の最大値
```sql
SELECT MAX(score),MIN(score),AVG(score),MAX(score/max_score)
FROM exam_results;
-- 結果
+------------+------------+------------+----------------------+
| MAX(score) | MIN(score) | AVG(score) | MAX(score/max_score) |
+------------+------------+------------+----------------------+
|        100 |         30 |    74.4000 |               1.0000 |
+------------+------------+------------+----------------------+
```

### GROUP BY
科目毎の最大値、最小値、平均値を求め、名前を最大、最小、平均に変更

```sql
SELECT name, 
MAX(score) as 最大 ,
 MIN(score) as 最小,
AVG(score) as 平均
FROM exam_results
GROUP BY name;
-- 結果
+--------+--------+--------+---------+
| name   | 最大   | 最小   | 平均    |
+--------+--------+--------+---------+
| 化学   |     99 |     55 | 78.2000 |
| 数学   |     92 |     43 | 67.4000 |
| 物理   |    100 |     30 | 77.6000 |
+--------+--------+--------+---------+
```

### INNER JOIN
studentsとexam_resultsを結合し、生徒毎の、最高得点、最少得点、平均得点を出力

```sql
SELECT students.name, MAX(score), MIN(score), AVG(score)
FROM students
INNER JOIN exam_results
ON students.id = exam_results.student_id
GROUP BY students.name;
-- 結果
+-----------+------------+------------+------------+
| name      | MAX(score) | MIN(score) | AVG(score) |
+-----------+------------+------------+------------+
| masaya    |         99 |         30 |    57.3333 |
| yuka      |         85 |         65 |    73.6667 |
| おりば    |        100 |         92 |    97.0000 |
| じょじ    |         85 |         55 |    68.0000 |
| なつこ    |         88 |         67 |    76.0000 |
+-----------+------------+------------+------------+
```

### CASE WHEN  条件分岐
#### NULLがあったら、出力上の表記を変える
```sql
SELECT
    students.name,
    students.age,
    CASE WHEN clubs.name IS NOT NULL THEN clubs.name 
　　ELSE '無所属' end as club_name
FROM
    students
LEFT JOIN club_students
    ON students.id = club_students.student_id
LEFT JOIN clubs
    ON club_students.club_id = clubs.id;
-- 結果
+-----------+-----+--------------+
| name      | age | club_name    |
+-----------+-----+--------------+
| じょじ    |  20 | サッカー     |
| じょじ    |  20 | 囲碁         |
| じょじ    |  20 | 合気道       |
| じょじ    |  20 | 軽音         |
| yuka      |  22 | 野球         |
-- ...
-- INNER JOINの場合、masayaのレコード自体が表示されない。
```

## 部活ごとに、男性と女性それぞれ何人所属しているか、出力せよ

```sql
SELECT
    clubs.name,
    SUM(CASE WHEN students.gender = 0 THEN 1 ELSE 0 END) as male,
    SUM(CASE WHEN students.gender = 1 THEN 1 ELSE 0 END) as female
FROM
    clubs
LEFT JOIN club_students
    ON clubs.id = club_students.club_id
LEFT JOIN students
    ON club_students.student_id = students.id
GROUP BY clubs.name
```