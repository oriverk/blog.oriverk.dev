---
create: '2019-11-29'
update: '2020-03-10'
title: 'Twitter に見栄え良くコード投稿したかった'
tags: [rails]
published: true
---

from [Qiita: Twitterにコードを身えばよく投稿したい](https://qiita.com/OriverK/items/df41ec6b57b40a06a64d#comments)

## はじめに

### きっかけ（こんな呟きを見かけた

[twitter](https://twitter.com/ellnore_pad_267/status/1190693466793074689)

### 出来たもの

- [Codr0：https://codr0.herokuapp.com/](https://codr0.herokuapp.com/)
- [Github : oriverk/Codr](https://github.com/oriverk/Codr)
- [GithubPage](https://oriverk.github.io/)

### 作成の過程で収穫物

- ActiveRecord Storage 等の Rails 5.2
- Twitter Login 方法と仕組みなど
- JS の基礎（getElementById や setAttribute、文字カウントなど）
- AWS S3 関連
- XSS 対策

## 作成の前に

### 作成要件

![image](/assets/posts/201911/twitter2.png)

- マークダウン投稿、シンタックスハイライト
  - gem: redcarpet, rouge
- 投稿から画像生成
  - html2canvas
  - 参照：[html2canvas](http://html2canvas.hertzen.com/)
  - 参照：[JSでhtmlを画像化する方法(html2canvasの使い方) from 湧くべく](https://wakubeku.com/?p=175)
- AWS S3 に og:image 用の画像を保存

### 作成の流れ：予定

1. rails new codr, Git init, heroku create、Active Storage
2. AWS S3 あれこれ
3. Twitter 登録、ログイン機能作成

### 開発環境

- vm : Linux Ubuntu (virtualbox + vagrant)
  - Ruby 2.5.1p57
  - Rails 5.2.3
  - Postgresql
  
## 実作業

```rb
rails new codr -d postgresql
```

DB 設定等は割愛

### Gem

```rb
# Gemfile
gem 'mini_racer'
gem 'rails-i18n'

gem 'devise'
gem 'omniauth'
gem 'omniauth-twitter' # twitter login
gem 'devise-i18n' # make devise japanize
gem 'devise-i18n-views'

gem 'redcarpet' # markdown processor
gem 'rouge' # highlighter

gem 'meta-tags'

gem 'aws-sdk-s3' # aws s3
```

- 参照: [kpumuk/meta-tags](https://github.com/kpumuk/meta-tags)

### rails.credentials.yml

当初は.`gitignore`と`dotenv`等を使っていたが、作成途中で Rails 5.2 からの`rails.credentials.yml`を利用した。復号化には`/config/master.key`を利用。

```sh
# editor setting
 EDITOR="vim" rails credentials:edit
# edit credentials.yml
rails credentials:edit
# show credential.yml
rails credentials.yml:show

# herokuにmaster.keyを環境変数として指定
# heroku config:set ENV_VAR="環境変数" --app "アプリ名"

# 追加した変数を使用するには
Rails.application.credentials.dig(:twitter, :API_Key)
```

### rails gあれこれ

```sh
# devise
rails g devise:install
rails g devise User name:String

# Add Admin column to User
rails g migration AddAdminToUsers
# add setting at /db/migrate/20191103141531_add_admin_to_users.rb
add_column :users, :admin, :boolean, default: false

# add views and controllers to modify devise
rails g devise:controllers users
rails g devise:views users

# japanize
# add at /config/application.rb
config.i18n.default_locale = :ja
=> create /config/locale/devise.view.ja.yml
```

```sh
# scaffold post
rails g scaffold Post user:references name:string content:text date:datetime
```

### ActiveRecord Associations関連付け

```rb
# /app/model/
# user
has_many :posts

# post
belongs_to :user
```

## 投稿関連

### マークダウン投稿

- 参照：[Redcarpet：Github](https://github.com/vmg/redcarpet)

- 基本：`Redcarpet::Markdown.new(renderer, extensions = {}).render(@post.content)`
オプションや XSS 対策等を追加したく、helper メソッドを作成した。

```rb
# app/helpers/posts_helper.rb
Module PostsHelper
  require 'rouge/plugins/redcarpet'
  class RougeRedcarpetRenderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet

    def header(text, level)
    # make # => h2, ## => h3
      level += 1
      "<h#{level}>#{text}</h#{level}>"
    end
  end

  def markdown(text)
    render_options = {
      # do not allow any user-inputted HTML in the output.
      filter_html: true,
      hard_wrap: true,
    }
   
    extensions = {
      # <>で囲まれていない時は、リンクとして認識しない
      autolink: true,
      # ```/m```をコードとする
      fenced_code_blocks: true,
      lax_spacing: true, 
      no_intra_emphasis: true,
      strikethrough: true,
      superscript: true,
      tables: false,
      highlight: true,
      disable_indented_code_blocks: true,
      # #の後にスペースが無くても良いか
      space_after_headers: false
    }
    renderer = RougeRedcarpetRenderer.new(render_options)
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end
end
```

### html_safe => sanitize

ホワイトリスト方式の [sanitizeヘルパー](https://edgeapi.rubyonrails.org/classes/ActionView/Helpers/SanitizeHelper.html#method-i-sanitize)　を使用した。

```rb
# app/views/posts/index.html.erb
# sanitize(html, options = {})
 <div id="capture" class="content">
    <%= sanitize(markdown(@post.content), tags: %w(div img h1 h2 h3 h4 h5 strong em a p pre code ), attributes: %w(class href)) %>
</div>
```

### 投稿内容のデータ化、AWSへの画像保存

Heroku では画像保持がされないので、作成画像を AWS S3 に保存し、og:image に添付する形を取った。

1. Web アプリ内で通常投稿
2. show ページ表示（同時に html2canvas で Base64 としてデータ取得、hidden_field に格納）
3. ツイートボタン押す（Post され、post モデル内で base64 をデコード）
4. Active Storage を通して、AWS S3 に保存

### Active Storage

Rail5.2 からの機能で、今までの carrievave や paperclip 等を使わずに、クラウドストレージ等へのアップロードが容易になる。今回は AWS S3 を使った。

- 参照: [Active Storage](https://railsguides.jp/active_storage_overview.html)

```sh
# set up
rails active_storage:install
# rails g resource comment content:text
rails db:migrate
```

```rb
# app/models/post.rb
class Post < ApplicationRecord
# 今回は1つの投稿につき、1枚の画像なので。
# 複数なら => has_many_attached :prtscs
  has_one_attached :prtsc
end
```

```rb
# app/config/environments/
# ファイル保存先変更
# development.rb
config.active_storage.service = :local
# production.rb
config.active_storage.service = :amazon
```

`rails credentials:edit` で AWS アクセスキーとシークレットキーを追加。

```yaml
# config/credentials.yml.enc
aws:
  access_key_id: 
  secret_access_key:
```

```yml
# config/storage.yml
test:
  service: Disk
  root: <%= Rails.root.join("tmp/storage") %>
local:
  service: Disk
  root: <%= Rails.root.join("storage") %>
amazon:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  region: ap-northeast-1
  bucket: codr0
```

```rb
# Gemfile
# gemが必要
gem 'aws-sdk-s3', require: false
# 今回は不要だったので、入れず。
gem 'mini_magick'
```

### html2canvas

1. ツイートボタン押下時に画像を Post するためのフォーム`hidden_field`を用意
2. `html2canvas.js`を`app/assets/javascripts`ディレクトリ配下に保存。
3. html 上に置く script コードを改修

```rb
# app/views/posts/show.html.erb
<%= form_with(model: @post, local: true) do |form| %>
  <%= form.hidden_field :id, value: @post.id %>
  <%= form.hidden_field :prtsc, value: "" %>　# idはpost_prtscになる。
  <%= form.submit "Post", class:"btn btn-outline-dark", id:"tweet", value:"tweet" %>
<% end %>
```

```rb
# app/views/layouts/application.html.erb
<script type="text/javascript">
  html2canvas(document.querySelector("#capture"),{scale:1, width:600}).then(canvas => {
    var base64 = canvas.toDataURL('image/jpeg', 1.0);
    document.getElementById('post_prtsc').setAttribute('value', base64);
  });
</script>
```

### Base64デコード

- 参照
- [python-twitter で BASE64 形式の画像をツイートする](https://qiita.com/maguro_tuna/items/184f63e37f3724f18e33)
- [base64でエンコードされた画像をActive Storageで保存する](https://qiita.com/ozin/items/5ec81a4b126b8ebf7a96)

```rb
# app/models/post.rb
attr_accessor :img

def parse_base64(img)
  if img.present?
    # data:image/jpeg;base64,/9j/4AAQSkZJRgABA・・・から/9j/4AA以降を選択取得
    content = img.split(',')[1]
    # 今回は、ユーザによる画像アップロード投稿ではなく、拡張子が決まっている
    filename = Time.zone.now.to_s + '.jpg'
    decoded_data = Base64.decode64(content)
    # String.IO.newにより、アプリ内に一時ファイルを作成しなくて済む
    prtsc.attach(io: StringIO.new(decoded_data), filename: filename)
  end
end
```

あとは posts_controller で、params から受け取った Base64 データを上の`parse_base64(img)`で変換し、保存すれば完了。

### AWS S3

- refferrence
  - [AWS S3](https://aws.amazon.com/jp/s3/)

AWS 上での登録、設定、バケット作成等は割愛。

### ツイート Share Button

```rb
# app/views/layouts/application.html.erb
<script>
  var base = 'https://twitter.com/intent/tweet?url=';
  var pageUrl = 'https://codr0.herokuapp.com/posts/' + document.getElementById('post_id').value;
  var option = '&button_hashtag=Codr0&ref_src=twsrc%5Etfw';
  var href = base + pageUrl + option;
  var twit = document.getElementById('tweet');
  twit.addEventListener('click', function() {
    window.open( href );
  });
</script>
```

### og:imageに画像添付

なお、head の meta 情報セットには、`gem 'meta-tags'`を使用

#### service_url()とurl_for()

- 参照
- [service_url() from api.rubyonrails](https://api.rubyonrails.org/classes/ActiveStorage/Variant.html#method-i-service_url)
- [url_for() from rails guide](https://railsguides.jp/active_storage_overview.html#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%99%E3%82%8B)

基本的にはどちらも、ActiveStorage に保存したデータの Url を取得するメソッドの様だ。
どちらもセキュリティの為にリンクの有効期限が短いみたいだが、違いが分からなかった。今回はツイートボタン押下し、Tweet した際に og:image として表示されればいい。

```rb
# app/views/posts/show.html.erb
# 画像がActive StorageでAWS S3に保存されて入れば
<% if @post.prtsc.attached? %>
  <% set_meta_tags og:{image: @post.prtsc.service_url} %>
<% end %>
```

## Twitterログイン

[TwitterDeveloperAccount](https://developer.twitter.com/content/developer-twitter/ja.html)が必要。割愛。

- 参照
- [gem 'omniauth-twitter'　github](https://github.com/arunagw/omniauth-twitter)
- [deviseの使い方（rails5版）](https://qiita.com/cigalecigales/items/f4274088f20832252374)
- [ominiauth 脆弱性に対するクックパドによるパッチ]](<https://github.com/cookpad/omniauth-rails_csrf_protection>)

```rb
# app/models/user.rb
# 参考ページと同じ基礎的な所は割愛する。
class User < ApplicationRecord
  def self.from_omniauth(auth)
    find_or_create_by!(provider: auth['provider'], uid: auth['uid']) do |user|
      # 一部割愛
      user.username = auth['info']['nickname']
      # SNS登録時は、ダミーメールを登録
      user.email = User.dummy_email(auth)
    end
   end

  # SNS登録(providerが存在する)時は、パスワード要求をしない
  def password_required?
    super && provider.blank?
  end

  def self.new_with_session(params, session)
    if session['devise.user_attributes']
      new(session['devise.user_attributes']) do |user|
        user.attributes = params
      end
    else
      super
    end
  end

  private

  def self.dummy_email(auth)
    "#{auth.uid}-#{auth.provider}@example.com"
  end
end
```

Twitter のニックネームが取得できるようになったので、元からある User の name テーブルは削除した。

## 改修(加筆

### メディアクエリ

想定ユーザは殆どスマホなのに、PC で作成し、CSS を PC の見た目でやってた。折角 SCSS でやってるので、変数を利用した。

```scss
#app/assets/stylesheets/scaffold.scss
// ディスプレイサイズが680pxまでなら。
$tab: 680px;
@mixin tab {
  @media (max-width: ($tab)) {
    @content;
  }
}

// .box {
//   @include tab {
//     background-color: blue;
//   };
// }
```

## 最後に

gist 等がコードスクショを og:image で表示してくれたら全て済むのでは
