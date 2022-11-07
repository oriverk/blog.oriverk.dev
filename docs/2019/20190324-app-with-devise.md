---
create: '2019-03-24'
update: '2019-12-04'
title: 'Day 13： Devise によるログイン機能付きサイトの作成'
tags: [cebu, rails, devise]
published: true
---

from Qiita:

- [13日目(1)：Deviseによるログイン機能付きサイトの作成](https://qiita.com/OriverK/items/5a867dbadbcef452c9fd)
- [12日目：12日目：PostgreSQLを用いたログイン機能付きサイト](https://qiita.com/OriverK/items/ef1883408ea924376c1c)の続き

## Environment

- 仮想環境 OS: Ubuntu 18.04
- Ruby：2.51
- Rails: 5.2.2
  - [devise](https://github.com/plataformatec/devise))
- DB: PostgreSQL

## flow

1. controllers と views を以前の大学データの方から流用
2. migration ファイル作成
3. rooting 変更

## Contents

### make migration file

```sh
rails g migration AddNameToStudents name:string gender:integer age:integer opinion:text
#　実行
#  create    db/migrate/20190324043018_add_name_to_students.rb
```

#### reflect change to DB

```sh
rails db:migrate
```

### modify routing

追加

```rb:app/confing/routes.rb
resources :students
root to: 'students#index'
```

### modify views

今回不要な ExamResultNew のリンク削除
ログアウトリンクの作成

```rb:app/views/student.html.erb
<% @students.each do |student| %>
  <tr>
    <td><%= student.try(:name) %></td>
    <td><%= student.email %></td>
    <td><%= student.try(:gender) %></td>
    <td><%= student.try(:age) %></td>
    <td><%= student.try(:opinion) %></td>
    <td><%= link_to 'Show', student %></td>
    <td><%= link_to 'Edit', edit_student_path(student) %></td>
    <td><%= link_to 'Destroy', student, method: :delete, data: { confirm: 'Are you sure?' } %></td>
    <%= link_to 'Log Out', destroy_student_session_path, method: :delete %>
  </tr>
<% end %>
```

### modify controller

```rb:app/controllers/student_controller.rb
class StudentsController < ApplicationController
  before_action :authenticate_student!
end
```
