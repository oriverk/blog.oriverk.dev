---
create: '2019-03-29'
update: '2019-12-04'
author: Kawano Yudai
title: 'Day 16：devise で管理者を追加する'
tags: [ruby, rails, devise]
---

from [Qiita: deviseだけで管理者を追加したい](https://qiita.com/OriverK/items/d7704d23cf74c51503b4)

## Environment
- Ubuntu 18.04
  - Ruby：2.51
  - Rails: 5.2.2
    - gem: 'devise'（ログイン等の機能用), 'kaminari'( pagination )
  - DB: PostgreSQL

## 実作業
### テーブルにadminカラム追加
```sh
# rails g migration Addカラム名Toテーブル名　カラム定義
rails g migration AddAdminToStudent admin:boolean
```

#### boolean型
真理値の「真 = true」と「偽 = false」という2値をとるデータ型のこと。Rubyでは偽はfalseとnilで、それ以外がtrueになる。言語やDBによっては、1と0だったり、違うので注意。

### マイグレーションファイルを編集
boolean型と定義する際は、デフォルト値を設定しないといけない。adminのデフォルト値に引数falseを渡し、デフォルトではadmin権限がない、と指定する。

```rb
# /db/migrate/20190328011407_add_admin_to_student.rb
class AddAdminToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :admin, :boolean,default: false
  end
end
```

`rails db:migrate`

### admin権限を確認付与
```rb
stu = Student.find(1)
stu.admin?
=>false
stu.admin = true
stu.save
stu.admin?
=>true
```

admin属性が追加され、またadmin?メソッドを使用できるようになっている。

### adminのみが全データを見れるようにする
admin以外は、自分のデータしか見れないようにしたい。

```rb
# users_controller.rb
 def index
    if current_student.admin?
      @students = Student.page params[:page]
    else
      @student = current_student
    end
  end
```

```rb
# app/views/student
 <tbody>
    <% if current_student.admin? %>
      <% @students.each do |student| %>
        <tr>
          <td><%= student.name %></td>
          <td><%= student.email %></td>
          <td><%= display_name student.gender %></td>
          <td><%= display_age student.age %></td>
          <td><%= student.opinion %></td>
          <td><%= link_to 'Show', student %></td>
          <td><%= link_to 'Edit', edit_student_path(student) %></td>
          <td><%= link_to 'Destroy', student, method: :delete, data: { confirm: 'Are you sure?' } %></td>
          <td><%= link_to 'New Exam Result', new_exam_result_path(student_id: student.id) %></td>
          <td><%= link_to 'New Club Student', new_club_student_path(student_id: student.id) %></td>
        </tr>
      <% end %>
    <% else %>
      <tr>
        <td><%= @student.name %></td>
        <td><%= @student.email %></td>
        <td><%= display_name @student.gender %></td>
        <td><%= display_age @student.age %></td>
        <td><%= @student.opinion %></td>
        <td><%= link_to 'Show', @student %></td>
        <td><%= link_to 'Edit', edit_student_path(@student) %></td>
        <td><%= link_to 'Destroy', @student, method: :delete, data: { confirm: 'Are you sure?' } %></td>
        <td><%= link_to 'New Exam Result', new_exam_result_path(student_id: @student.id) %></td>
        <td><%= link_to 'New Club student', new_club_student_path(student_id: @student.id) %></td>
      </tr>
    <% end %>
  </tbody>
</table>
<% if current_student.admin? %>
  <%= paginate @students %>
<% end %>
```