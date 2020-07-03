---
create: '2019-03-20'
update: '2019-12-04'
author: Kawano Yudai
title: 'Qiita: 10日目(1)：マスターデータ（ DB へ情報入力、ページに出力'
tags: [Ruby, Rails, MySQL]
image: '/assets/posts/201905/cebu3.png'
---

from [Qiita: マスターデータ（DBへ情報入力、ページに出力](https://qiita.com/OriverK/items/b7eae8f195d9d2111ea4)

## Environment
仮想環境OS: Ubuntu 18.04
Ruby：2.51
Rails:5.2.2

##  テーブル同士の関連図

<picture>
  <source srcSet="/assets/posts/201905/cebu3.webp" type="image/webp" />
  <img src="/assets/posts/201905/cebu3.jpg" alt="data table" />
</picture>

## 流れ
1. 中間テーブルにデータ入力
2. 性別の0 or 1の表記を、male or femaleに変更
3. Studentのshowページに、生徒ごとの試験結果等、データを出力

## 実段階
### 生徒データと関連付けするときは
```rb
student1 = Student.first
student1.clubs << Club.first
student1.save
```

### データ入力
id1からid100までの生徒に、0から4個の部活(選択肢は13部)に入ってもらう。

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
id100までの生徒に、9科目の試験を受けてもらう。

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
- 学生ごとのshowページで表示したいもの
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

-- =>
+--------+--------------+-----------+-------+-------+
| name   | name         | name      | score | ratio |
+--------+--------------+-----------+-------+-------+
| taro-1 | 一次試験     | 数学      |   181 |    91 |
| taro-1 | 試験1        | 数学      |    61 |    31 |
| taro-1 | 一次試験     | 国語      |   146 |    73 |
| taro-1 | 試験2        | 国語      |   200 |   100 |
| taro-1 | 一次試験     | 英語      |   199 |   100 |
| taro-1 | 試験3        | 英語      |   108 |    54 |
| taro-1 | 一次試験     | 化学      |    99 |    99 |
-- (割愛)
```

#### ページ上の出力
##### students_controllerのshowアクション編集

- 参照: [Active Record クエリインターフェイス](https://railsguides.jp/active_record_querying.html#%E3%83%87%E3%83%BC%E3%82%BF%E3%83%99%E3%83%BC%E3%82%B9%E3%81%8B%E3%82%89%E3%82%AA%E3%83%96%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%82%92%E5%8F%96%E3%82%8A%E5%87%BA%E3%81%99)

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
