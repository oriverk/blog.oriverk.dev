---
create: '2019-03-17'
update: '2019-12-04'
title: 'Day 9 ~ 14：大学生データ操作 App'
tags: [cebu, rails, mysql]
published: true
---

- [9日目：大学生データ（マスターデータ](https://qiita.com/OriverK/items/80dc52ba9753f8bf6c82)
- [10日目(1)：マスターデータ（DBへ情報入力、ページに出力](https://qiita.com/OriverK/items/b7eae8f195d9d2111ea4)
- [11日目(1)、12日目：マスターデータ。ページUIの編集、ページャ導入](https://qiita.com/OriverK/items/93e864c070425f9bc9cd)
- [14日目：Scaffoldで作成したサイトにgem devise等を組み合わせていく](https://qiita.com/OriverK/items/a2830d992d8d75c53b38)

## 9日目

- rails new で動かない不具合
  - stop spring で解消
- Ruby 側で整数型を int と書き間違えることによるエラー
  - **Rubyの整数型はinteger**
  - MySQL は int（C++経験上、int の方が馴染み深い）
- rails db:migrate コマでのエラー
  - 中間テーブルを先に作ってしまった為。
  - 中間テーブルは主テーブルの id 等参照するので、作成は一番後。
- 最適なデータ型を選択できなかった

不具合改善の中で、Vagrantfile で、使用できる RAM のサイズを 8GB に変更

```rb
# Vagrantfile
config.vm.provider "virtualbox" do |vb
  vb.memory = "8192"
end
```

## Environment

- 仮想環境 OS: Ubuntu 18.04
- Ruby：2.51
- Rails:5.2.2

## 作成データ

- テーブル
  - student (id, name,email, gender, age, opinion, updated_at, created_at)
  - ExamResult (id, student, subject, name, score, updated_at, created_at)
    - 中間テーブル
  - Subject (id, name, max_score, updated_at, created_at)
    - ※教科の意
  - ClubStudent (id, student, club, name, updated_at, created_at)
    - 中間テーブル
  - Club (id, name, updated_at, created_at)

## 準備

### rails new

```sh
rails new self_univ -d mysql
```

```rb
# Gemfile
gem 'mini_racer', platforms: :ruby
```

`bundle install`

```yml
# qpp/config/database.yml
password:
```

`rails db:create`

## scaffold(本段階

- scaffold では controller と model が作成される
- Ruby の整数型は integer
- 中間テーブルは一番最後に作成
- 主キーを参照する column を reference で指定
  - 自動で bigint に設定される

## rails g scaffold

```sh
rails g scaffold Student name:string email:string gender:integer age:integer opinion:text
rails g scaffold Subject name:string max_score:integer
rails g scaffold Club name:string
rails g scaffold ExamResult student:references subject:references name:string score:integer
# ClubStudentテーブル（中間テーブルなので最後
rails g scaffold ClubStudent student:references club:references name:string
```

`rails db:migrate`

### テーブル同士の relation 定義

- [Active Record Associations](https://guides.rubyonrails.org/association_basics.html)
- [Active Record の関連付け](https://railsguides.jp/association_basics.html#belongs-to%E9%96%A2%E9%80%A3%E4%BB%98%E3%81%91)

```rb
# Studentモデル
class Student < ApplicationRecord
  has_many :exam_results
  has_many :subjects, through: :exam_results
  has_many :club_students
  has_many :clubs, through: :club_students
end

# Subject model
class Subject < ApplicationRecord
  has_many :exam_results
  has_many :students, through: :exam_results
end

# ExamResult model
class ExamResult < ApplicationRecord
  belongs_to :student
  belongs_to :subject
end

# Club model
class Club < ApplicationRecord
  has_many :club_students
  has_many :students, through: :club_students
end

# ClubStudent model
class ClubStudent < ApplicationRecord
  belongs_to :student
  belongs_to :club
end
```

## マスタデータ作成

```rb
# student table
(1..100).each do |num|
  if num % 2 == 0
    gen = 0
    ag = 0
    at = 0
  else
    gen = 1
    ag = 1
    at = 1
  end

  op = (0..20).map{('あ'..'わ').to_a[rand(26)]}.join
  user = Student.create(name: "taro-#{num}", email: "val-#{num}@gmail.com", gender: gen, age: ag, opinion: op)
end

# club table
Club.create(name: '自転車')
Club.create(name: 'サッカー')
Club.create(name: 'バスケットボール')
# ...

# subject table
Subject.create(name: '数学', max_score: 200);
Subject.create(name: '国語', max_score: 200);
Subject.create(name: '英語', max_score: 200);
# ...
```

### (0..20).map{('あ'..'わ').to_a[rand(26)]}.join

#### 範囲オブジェクト

文字も使える

#### map

要素の数だけ繰り返しブロックを実行し、ブロックの戻り値を集めた配列を作成して返す。
collect メソッドの別名です。

```rb
# 配列の入った変数.map {|変数名| 処理内容 }
numbers = ["68", "65", "6C", "6C", "6F"]
p numbers.map {|item| item.to_i(16) }
[104, 101, 108, 108, 111]
#上では16進数を10進数に変換
```

#### to_a(Array)

Array オブジェクトを返す

#### rand(max)

max が 0 の場合は 0.0 以上 1.0 未満の実数を、正の整数の場合は 0 以上 max 未満の整数を返す

#### join(sep =)

join メソッドは、配列の各要素を文字列に変換し、引数 sep を区切り文字として結合した文字列を返します。
引数を省略すると区切り文字なしで要素を結合した文字列になる

---

## 10日目

今回の流れ

1. 中間テーブルにデータ入力
2. 性別の 0 or 1 の表記を、male or female に変更
3. Student の show ページに、生徒ごとの試験結果等、データを出力

## 実段階

Students の show ページの、前回までの状態

![image](/assets/posts/201903/student2.webp)

### 生徒データと関連付けするときは

```rb
student1 = Student.first
student1.clubs << Club.first
student1.save
```

### データ入力

生徒の部活情報
id1 から id100 までの生徒に、0 から 4 個の部活(選択肢は 13 部)に入ってもらう。

```rb
(1..100).each do |i|
  student = Student.find(i)
  1.upto(rand(0..4)) do
    student.clubs << Club.find(rand(1..13))
    student.save
  end
end
```

生徒の試験結果情報
id100 までの生徒に、9 科目の試験を受けてもらう。
なお、点数は 0 点から各教科ごとに設定の最大点までのランダム

```rb
(1..100).each do |i|
  student = Student.find(i)
  1.upto(9) do |num|
    sub = Subject.find(num)
    exam_res = ExamResult.new
    exam_res.name = "試験#{num}"
    exam_res.score = rand(1..sub.max_score)
    exam_res.subject = sub
    student.exam_results << exam_res
    student.save
  end
end
```

### Studentsのindexページの表記を変更

```rb
# app/models/studetns.rb
enum gender: { male: 0 ,female: 1}
enum age: {"teen": 0, "twenty": 1}
```

```rb
# app/views/_form.html.erb
<div class="field">
  <%= form.label :gender %>
  <%= form.radio_button :gender, 'male' %>男性
  <%= form.radio_button :gender, 'female' %>女性
</div>
<div class="field">
  <%= form.label :age %>
  <%= form.radio_button :age, '20代' %>20代
  <%= form.radio_button :age, '30代' %>30代
</div>
```

### 出力を考える

- 学生ごとの show ページで表示したいもの
  - 生徒のデータ(name, mail, gender, age, opinion)
  - 生徒の教科ごとの試験結果点数
  - 性と全体の試験結果の平均点、最大点、最小点

#### MySQL上の出力

```sql
SELECT
    subjects.name,
    CAST(AVG(exam_results.score) as unsigned) as avg_score,
    MAX(exam_results.score) as max_score,
    MIN(exam_results.score) as min_score
FROM
    students
INNER JOIN exam_results
    ON students.id = exam_results.student_id
INNER JOIN subjects
    ON exam_results.subject_id = subjects.id
GROUP BY subjects.id, subjects.name
```

```sql
-- 出力結果
+--------+--------------+-----------+-------+-------+
| name   | name         | name      | score | ratio |
+--------+--------------+-----------+-------+-------+
| taro-1 | 一次試験     | 数学      |   181 |    91 |
| taro-1 | 試験1        | 数学      |    61 |    31 |
| taro-1 | 一次試験     | 国語      |   146 |    73 |
-- ...
```

#### ページ上の出力

##### students_controllerのshowアクション編集

- 参照
- [Active Record クエリインターフェイス](https://railsguides.jp/active_record_querying.html#%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%81%8B%E3%82%89%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%8F%96%E3%82%8A%E5%87%BA%E3%81%99)

```rb
# app/controllers/studetns_controller.rb
def show
  @students = 
    Student.joins(:subjects)
            .select('students.name, students.email, students.age, students.gender, students.opinion, subjects.id as subject_id')
            .select('exam_results.name as exam_result_name, subjects.name as subject_name, exam_results.score')
            .select('CAST((exam_results.score / subjects.max_score) * 100 as unsigned) as ratio')
            .where(id: params[:id])

  avg_result = 
    Student.joins(:subjects)
            .select('subjects.id as subject_id')
            .select('CAST(AVG(exam_results.score) as unsigned) as avg_score')
            .select('MAX(exam_results.score) as max_score')
            .select('MIN(exam_results.score) as min_score')
            .group('subjects.id')
            .order('subjects.id')
  @score_hash = {}
  avg_result.each do |avg_res|
    h = Hash.new
    h[:avg_score] = avg_res.avg_score
    h[:max_score] = avg_res.max_score
    h[:min_score] = avg_res.min_score                                                                                                                                     
    @score_hash[avg_res.subject_id] = h
  end
end
```

##### showページのviewを編集

```rb
# app/views/students/show.html.erb
<table border="1">
  <tr>
    <th>科目名</th>
    <th>点数</th>
    <th>平均</th>
    <th>最高</th>
    <th>最小</th>
  </tr>
  <% @students.each do |student| %>
    <tr>
      <td><%= student.subject_name %></td>
      <td><%= student.score %></td>
      <td><%= @score_hash[student.subject_id][:avg_score] %></td>
      <td><%= @score_hash[student.subject_id][:max_score] %></td>
      <td><%= @score_hash[student.subject_id][:min_score] %></td>
    </tr>              
  <% end %>
</table>
```

---

## 11日目

今回の流れ

1. ExamResults の index ページのデータ出力を編集
2. ExamRusult の新規作成ページの UI を変更
3. gem kaminari でページャー追加

## 実段階

### modify index page

※app/views/exam_results/show.html.erb も同様にやる

```rb
# app/views/exam_results/index.html.erb
# before edit
# <td><%= exam_result.student %></td>
# <td><%= exam_result.subject %></td>

# after
<td><%= exam_result.student.name %></td>
<td><%= exam_result.subject.name %></td>
```

### newページにセレクトボックス

- [Action View Form Helpers](https://guides.rubyonrails.org/form_helpers.html#select-boxes-for-dealing-with-models)

```rb
# app/views/exam_results/_form.html.erb
<div class="field">
    <%= form.label :student_id %>
    <%= form.select :student_id, @students %>
 </div>
<div class="field">
    <%= form.label :subject_id %>
    <%= form.select :subject_id, @subjects %>
</div>
```

```rb
# app/controllers/exam_results_controller.rb
before_action :set_students_subjects, only: [:new, :edit]

def set_students_subjects
  @students = Student.all.pluck(:name, :id)
  @subjects = Subject.all.pluck(:name, :id)
end
```

## 編集後

![image](/assets/posts/201903/student3.webp)

![image](/assets/posts/201903/student4.webp)

## pagination by kaminari

student と ExamResult の index ページを、数ページに区切って表示させたい。
今回は gem の [kaminari](https://github.com/kaminari/kaminari) を用いる。

### インストール

```rb
# Gemfile
gem 'kaminari'
```

`bundle install`

### studentのindexページから変更

index アクションを編集

```rb
# app/controllers/students_controller.rb
def index
　　# 編集前：@students = Student.all
    @students = Student.page(params[:page]).per(20)
end
```

view を編集

```rb
# app/views/students/index.html.erb
# ファイル先頭行に追加
<div class="page-header">
# ファイル最終行に追加
<%= paginate @students %>
</div>
```

![image](/assets/posts/201903/student5.webp)

### ExamResultのindexページ編集

app/controllers/exam_result_controller.rb の index アクションと
app/view/exam_results/index.html.erb を同様に編集

### ページャの見た目を変える

```sh
rails g kaminari:views default

# 実行結果
  # create  app/views/kaminari/_next_page.html.erb
  #     create  app/views/kaminari/_gap.html.erb
  #     create  app/views/kaminari/_prev_page.html.erb
  #     create  app/views/kaminari/_last_page.html.erb
  #     create  app/views/kaminari/_first_page.html.erb
  #     create  app/views/kaminari/_paginator.html.erb
  #     create  app/views/kaminari/_page.html.erb
```

### ページャの設定を変える

```sh
rails g kaminari:config

#実行結果
create  config/initializers/kaminari_config.rb
# ここで作成されたファイルに設定がある。
```

Bootstrap 対応のページャテーマもある。

- [amatsuda/kaminari_themes](https://github.com/amatsuda/kaminari_themes)

```rb
# config/initializers/kaminari_config.rb
# frozen_string_literal: true
Kaminari.configure do |config|
  # config.default_per_page = 25
  # config.max_per_page = nil
  # config.window = 4
  # config.outer_window = 0
  # config.left = 0
  # config.right = 0
  # config.page_method_name = :page
  # config.param_name = :page
  # config.params_on_first_page = false
end
```

---

## 12日目

### kaminariの別のファイル設定

- models に paginates_per 30 と記述
- controller の index アクションの末尾にある、per()を削除
  - (ビューファイルは同じ)

exam_result も編集は同じ。

```rb
# app/models/student.rb
paginates_per 30
```

```rb
# app/controllers/students_controller.rb
@students = Student.page(params[:page])
```

```rb
# app/views/students/index.html.erb
# ファイル先頭
<div class="page-header">
# ファイル末尾
<%= paginate @students %>
</div>
```

### studentのindexページに、exam_resultのnewへのリンク作成

リンクを作成

```rb
# app/views/student/index.html.erb
<td><%= link_to 'New Exam Result', new_exam_result_path(student_id: student.id) %></td>
```

```rb
# app/controllers/exam_results_controller.rb
def new
  if params[:student_id]
    @student = Student.find(params[:student_id])
    @selected_student = [@student.name, @student.id]
  end
  @exam_result = ExamResult.new
end
```

```rb
# app/views/exam_result/_form.html.erb
<%= form.select :student_id, options_for_select(@students, @selected_student) %>
```

student index から'New Exam Result'リンクを押すと、exam_result の new ページに飛び、フォームのセレクトボタンのうち、生徒が自動で選択される。

---

## 14日目

今週からは、scaffold で作成した大学データと、gem の devise、Bootstrap 等を組み合わせる。

### What I did

- Rails の命名規則(単数形と複数形)
- DB のカラム定義を後から変更
- render partial: 部分テンプレの参照
- validation
- **UNSIGNEDという型が存在しないPostgreSQL**

### Railsの命名規則(単数形と複数形)

rails g コマンドで、controller 名や model 名を指定する際に、混乱した。

```sh
# rails generate scaffold model名の単数形　フィールド名の型と並び
# rails g controller controller名の複数形
# カラムの追加
# rails generate migration AddカラムToモデル名の複数形 フィールド名と並び
```

- model は単数形で、頭文字を大文字
  - scaffold の場合、model が基準
- controller 名は複数形、頭文字を大文字
  - 1 つの controller に複数の action が含まれるため

### DBのカラム定義を後から変更

`rails g scaffold` 時に "refereces" とミスタイプしていた。

```rb
# db/migrate/20190326030303_create_club_students.rb
class CreateClubStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :club_students do |t|
     # t.refereces :student
     # =>
      t.references :student
      t.references :club, foreign_key: true
      t.timestamps
    end
  end
end
```

なお、ALTTER TABLE コマンドを使って、あとから修正する方法は
DB 内のデータを書き換えるだけで、アプリ自体のファイル等は編集されない。

```sql
-- ALTER TABLE テーブル名 MODIFY COLUMN カラム名 新しい定義
ALTER TABLE ClubStudent MODIFY COLUMN student references
```

つまり、原因の根本的な部分を修正できないので、駄目

## render partial: 部分テンプレ

- 参照: [render - rails docs](http://railsdoc.com/references/render)

全てのページのヘッダーに、ログアウトや他の student や clubs 等のリンクを乗せる

共通して表示させるので、/app/views/layouts/application.html.erb　を編集する。
なお、部分テンプレファイル名は『_』アンダースコア始まり

```rb
# /app/views/layouts/application.html.erb
<body>
  <%= render :partial => 'shared/header' %>
</body>
```

表示させたいリンクを書きこむ。

```rb
# /app/views/shared/_header.html.erb
<%= link_to 'Student list', students_path %> 
<%= link_to 'subjects list', subjects_path %> 
<%= link_to 'clubs list', clubs_path %> 
<%= link_to 'exam_result list', exam_results_path %>
<%= link_to 'club_stdent list', club_students_path %>
<%= link_to 'Log Out', destroy_student_session_path, method: :delete %>
```

## validation

- 参照: [Active Record Validations](https://guides.rubyonrails.org/active_record_validations.html)

バリデーションは有効なデータだけを DB に保存するのを確実にするための最善策。

### validate条件

```rb
# 空でないこと
validates :name, presence: true

# 因みに、空が条件ならば
# validates :name, absence: true

#入力文字の長さ
# **文字の最大長は、データ型を要参照。varcharなら255文字まで**
# 2文字以上
validates :name, length:{minimum:2}
# 255文字以上
validates :name, length:{maximum:255}

# exclusion含まない
validates :name, exclusion: { in: %w(部 サークル) }
# 『含む』ならinclusion
```

空白や文字列長、『サークル』という語には、validates が発動するが、『テニスサークル』だと発動しないので、正規表現等を使う必要がある。

## type "unsigned" does not exist (※Postgresql)

validates の実装していく最中に、エラーに気づいた
student の edit ページで更新すると、

```sh
# ActiveRecord::StatementInvalid in StudentsController#show

# PG::UndefinedObject: ERROR: type "unsigned" does not exist LINE 1: ...id as subject_id, CAST(AVG(exam_results.score) as unsigned) ... ^ : SELECT subjects.id as subject_id, CAST(AVG(exam_results.score) as unsigned) as avg_score, MAX(exam_results.score) as max_score, MIN(exam_results.score) as min_score FROM "students" INNER JOIN "exam_results" ON "exam_results"."student_id" = "students"."id" INNER JOIN "subjects" ON "subjects"."id" = "exam_results"."subject_id" GROUP BY subjects.id ORDER BY subjects.id
```

とエラーを吐き、ブラウザの戻るボタンで戻ると更新されている。
また、エラー原因であると思わる、`StudentController#show`は

```rb
# app/controllers/students_controller.rb
def show
  @students = 
    Student.joins(:subjects)
            .select('students.name, students.email, students.age, students.gender, students.opinion, subjects.id as subject_id')
            .select('exam_results.name as exam_result_name, subjects.name as subject_name, exam_results.score')
            .select('CAST((exam_results.score / subjects.max_score) * 100 as unsigned) as ratio')
            .where(id: params[:id])

  avg_result = 
    Student.joins(:subjects)
            .select('subjects.id as subject_id')
            .select('CAST(AVG(exam_results.score) as unsigned) as avg_score')
            .select('MAX(exam_results.score) as max_score')
            .select('MIN(exam_results.score) as min_score')
            .group('subjects.id')
            .order('subjects.id')
# (以下略)
```

因みに、この controller は、以前の大学データの controller からコピーしてきたものだ。
つまり、MySQL で動くアプリの controller。

### unsigned　(MySQL)

- MySQL においては正と負の整数を扱うことができる。
- unsigned を指定すると、正の数しか格納できなくなり、代わりに範囲が 2 倍になる。
- **unsignedにした値が負になると、エラーを起こす**
  - UNSIGNED は、マイナス値が入らないだけでなく、マイナスになる計算もできない。
  - CAST で一時的に型を変える事で回避は可能。

### `Postgresqlにはunsined型は存在しない(最重要)`

対応するには

- unsigned を int 等の型に置き換える
  - 今回は試験点数を扱っていて、int で事足りると思われる。
  - ただ、MySQL で int unsigned だと、範囲が正の方向に 2 倍になっている。
  - **扱う数によっては、intより1つ上ののbigintに変える必要がある**
- CAST as unsigned の部分を消す
  - MySQL で CAST as unsinged は、一時的に型を指定している

前回の大学データに倣って、今回は cast as int に変更した

```rb
# app/controllers/students_controller.rb
# (該当部分だけ抜き出し）
.select('CAST((exam_results.score / subjects.max_score) * 100 as int) as ratio')
.select('CAST(AVG(exam_results.score) as int) as avg_score')
```

正常に、student データの edit、update が機能した。

## データ入力にはpassword情報が必要

devise の関係上、パスワード情報入りのデータでないと、コンソールから入力できない。

### passwordカラムの追加

devise のモデル等がある、Student テーブルに、パスワードカラムを追加した。

```sh
# rails generate migration AddカラムToモデル名の複数形 フィールド名と並び
rails g migration AddPasswordToStudents password:string
```

db/migrate 下にファイルが生成される

```rb
# /db/migrate/20190327144825_add_password_to_students.rb
class AddPasswordToStudents < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :password, :integer
  end
end
```

これで、パスワード情報入りの生徒データを DB に入力できる。

### input data

未だデータの無い、生徒データと試験結果データをコンソールで入力した。

```rb
(1..100).each do |num|
  if num % 2 == 0 && num % 3 ==0
    gen = 0
    ag = 1
    elsif num % 2 == 0
    gen = rand(2)
    ag = rand(3)
  else
    gen = 1
    ag = 0
  end
  
  op = (1..10).map{('あ'..'わ').to_a[rand(26)]}.join
  nm = (1..3).map{('あ'..'わ').to_a[rand(26)]}.join

  user = Student.create!(name: "#{nm}", email: "#{nm}-#{rand(98)}@gmail.com", gender: gen, age: ag, opinion: op,password: 'password')
  end
```

```rb
(1..100).each do |i|
  student = Student.find(i)
  1.upto(rand(0..4)) do
    student.clubs << Club.find(rand(1..14))
    student.save
  end
end
```
