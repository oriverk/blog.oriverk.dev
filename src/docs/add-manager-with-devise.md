---
date: '2019-03-29'
update: '2019-12-04'
title: 'Qiita: 16日目：deviseで管理者を追加する'
tags: Qiita Ruby Rails devise
author: OriverK
slide: false
---

Qiita: [16日目：deviseだけで管理者を追加したい](https://qiita.com/OriverK/items/d7704d23cf74c51503b4) より

授業で作っている、大学生情報をまとめたwebアプリの今の状態は、
サインアップさえすれば、誰でもデータ閲覧、編集、削除等が出来る状態。

それでは、非常にまずいので、管理者を追加した。
今回はシンプルな機能だけで良いので、devise以外にはgemを追加しなった。

# 使用環境
- ホストOS: Windows10 Home
- 仮想環境: Ubuntu Bento/Bionic
- Ruby：2.51
- Rails: 5.2.2
    - gem ：'devise'（ログイン等の機能用）、'kaminari' （ページネーション）
- DB: PostgreSQL
- Heroku

# 実作業
## テーブルにadminカラム追加
カラム追加方法は、前日のパスワードカラム追加と同じ。

```sh:terminal
# rails g migration Addカラム名Toテーブル名　カラム定義
rails g migration AddAdminToStudent admin:boolean
```

### boolean型
真理値の「真 = true」と「偽 = false」という2値をとるデータ型のこと。
Rubyでは偽はfalseとnilで、それ以外がtrueになる。
言語やDBによっては、1と0だったり、違うので注意。

## マイグレーションファイルを編集
boolean型と定義する際は、デフォルト値を設定しないといけない。
adminのデフォルト値に引数falseを渡し、デフォルトではadmin権限がない、と指定する。

```/db/migrate/20190328011407_add_admin_to_student.rb
class AddAdminToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :admin, :boolean,default: false
  end
end
```

## マイグレーション実行

```sh:
rails db:migrate
```

## admin権限を確認付与

```rb:
stu = Student.find(1)
stu.admin?
=>false
stu.admin = true
stu.save
stu.admin?
=>true
```
admin属性が追加され、またadmin?メソッドを使用できるようになっている。

# adminのみが全データを見れるようにする
admin以外は、自分のデータしか見れないようにしたい。

## controllerのindexアクション編集
adminかどうかで、アクション動作を変える

```rb:
 def index
    if current_student.admin?
      @students = Student.page params[:page]
    else
      @student = current_student
    end
  end
```

## viewを編集
adminかどうかで、viewを変える。

```rb:app/views/student
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
adminでなければ、ページネーションが必要でなくなるので、そこも編集。

まだ、一般ユーザでもその他のデータを触れる状態なので、編集しないと。
