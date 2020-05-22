---
date: '2019-03-24'
update: '2019-12-04'
author: Kawano Yudai
title: 'Qiita: 13日目(1)：Deviseによるログイン機能付きサイトの作成'
tags: Qiita Ruby Rails
image: ''
slide: false
---

from Qiita:
- [13日目(1)：Deviseによるログイン機能付きサイトの作成](https://qiita.com/OriverK/items/5a867dbadbcef452c9fd)
- [12日目：12日目：PostgreSQLを用いたログイン機能付きサイト](https://qiita.com/OriverK/items/ef1883408ea924376c1c)の続き

# 環境
- 仮想環境OS: Ubuntu 18.04
- Ruby：2.51
- Rails: 5.2.2
    -主使用gem : devise([参照](https://github.com/plataformatec/devise))
- DB: PostgreSQL

# 流れ
1. controllersとviewsを以前の大学データの方から流用
2. migrationファイル作成
3. rooting変更

# 実作業
## make migration file
```sh
rails g migration AddNameToStudents name:string gender:integer age:integer opinion:text
#　実行
#  create    db/migrate/20190324043018_add_name_to_students.rb
```

### reflect change to DBに反映
```sh
rails db:migrate
```

## modify routing
```rb
# app/confing/routes.rb
# 追加
resources :students
root to: 'students#index'
```

## modify views
```rb
# app/views/student.html.erb
# 今回不要なExamResultNewのリンク削除
# ログアウトリンクの作成
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

## コントローラ変更
```rb
# app/controllers/student_controller.rb
class StudentsController < ApplicationController
  before_action :authenticate_student!
end
```