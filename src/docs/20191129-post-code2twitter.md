---
date: '2019-11-29'
update: '2020-03-10'
author: Kawano Yudai
title: 'Qiita: Twitterに見栄え良くコード投稿したかった'
tags: Qiita Ruby Rails OmniAuth AWS JavaScript
image: '/assets/codr700.jpg'
slide: false
---

from Qiita
- [Twitterにコードを身えばよく投稿したい](https://qiita.com/OriverK/items/df41ec6b57b40a06a64d#comments)

# きっかけ（こんな呟きを見かけた

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">ソースコードをツイートするときに<br><br>```<br>source code<br>```<br><br>ってやってマークダウンみたいに引用文にして欲しい。<br>ここはもうURLとかハッシュタグとかも全部エスケープして欲しい。</p>&mdash; える＠個人事業主 ❄半ニートえんじにゃー❄ (@ellnore_pad_267) <a href="https://twitter.com/ellnore_pad_267/status/1190693466793074689?ref_src=twsrc%5Etfw">November 2, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

# 出来たもの
- [Codr0：https://codr0.herokuapp.com/](https://codr0.herokuapp.com/)
- [Github : oriverk/Codr](https://github.com/oriverk/Codr)
- [GithubPage](https://oriverk.github.io/)

<picture>
  <source srcSet="/assets/codr700.webp" type="image/webp" className={classes.contentImg} />
  <img src="/assets/codr700.jpg" alt="screen-shot from this webpage" className={classes.contentImg} />
</picture>

# 作成の過程で収穫物
- Rails5.2での追加分（Active Record Storage含む
- Twitter Login方法と仕組み、そのたTwitterあれこれ
- JSの基礎（getElementByIdやsetAttribute、文字カウントなど
- AWS S3の使い方
- XSS対策

# 作成要件

<picture>
  <img src="/assets/posts/201911/twitter2.png" alt="table">
</picture>

- マークダウン投稿、シンタックスハイライト
    - gem: redcarpet, rouge（結局syntax-hightlightだけは反映されないまま
- 投稿から画像生成
   - html2canvas : 参照：[公式サイト](http://html2canvas.hertzen.com/)、[参考](https://wakubeku.com/?p=175)
- AWS S3にog:image用の画像を保存

# 作成の流れ：予定
1. rails new codr, git init, heroku create、Active Storage
2. AWS S3あれこれ 
3. twitter登録、ログイン機能作成

# 開発環境
- vm : Linux Ubuntu (virtualbox + vagrant)
    - Ruby 2.5.1p57
    - Rails 5.2.3
    - Postgresql

# 実作業： アプリ作成、諸準備
```rb:
rails new codr -d postgresql
# DB設定等は割愛
```

## Gem
今回は公開にまで至る予定なので、railsやdeviseの日本語化等も。が、想定ユーザはエンジニアだしと思い、殆ど英語になった。

```rb:Gemfile
gem 'mini_racer'
gem 'rails-i18n'

gem 'devise'
gem 'omniauth'
gem 'omniauth-twitter' # twitter login
gem 'devise-i18n' # japanize devise
gem 'devise-i18n-views'

gem 'redcarpet' # markdown processor
gem 'rouge' # syntax highlight

gem 'meta-tags'

gem 'aws-sdk-s3' # aws s3
```

参照:
- [kpumuk/meta-tags：Search Engine Optimization (SEO) for Ruby on Rails applications.](https://github.com/kpumuk/meta-tags)

## gitignore => rails.credentials.yml
当初は.`gitignore`と`gem 'dotenv'`等を使っていた。が、作成途中でRails5.2からの`rails.credentials.yml`を利用した。復号化には`/config/master.key`を利用。

```sh:terminal
# editor setting
 EDITOR="vim" rails credentials:edit
# edit credentials.yml
rails credentials:edit
# show credential.yml
rails credentials.yml:show

# herokuにmaster.keyを環境変数として指定
heroku config:set ENV_VAR="環境変数" --app "アプリ名"

# 追加した変数を使用するには
Rails.application.credentials.dig(:twitter, :API_Key)
```

## rails gあれこれ
```sh:terminal
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

```sh:terminal
# scaffold post
rails g scaffold Post user:references name:string content:text date:datetime
```

## Active Record Associations関連付け
```rb:/app/model/
# user
has_many :posts

# post
belongs_to :user
```

# 投稿関連
## マークダウン投稿
- 参照：[Redcarpet：Github](https://github.com/vmg/redcarpet)

基本：`Redcarpet::Markdown.new(renderer, extensions = {}).render(@post.content)`
オプションやXSS対策等を追加したく、helperメソッドを作成した。

```rb:app/helpers/posts_helper.rb
Module PostsHelper
  require 'rouge/plugins/redcarpet'
  class RougeRedcarpetRenderer < Redcarpet::Render::HTML
    include Rouge::Plugins::Redcarpet

    def header(text, level)  # #や##等がh2、h3となるようにした。
      level += 1
      "<h#{level}>#{text}</h#{level}>"
    end
  end

  def markdown(text)
    render_options = {
      filter_html: true,  # do not allow any user-inputted HTML in the output.
      hard_wrap: true,
    }
   
    extensions = {
      autolink: true,　# <>で囲まれていない時は、リンクとして認識しない
      fenced_code_blocks: true,   #  ```\n ```内をコード部分と見做す
      lax_spacing: true, 
      no_intra_emphasis: true,
      strikethrough: true,
      superscript: true,
      tables: false,  # テーブルを認識しない
      highlight: true,
      disable_indented_code_blocks: true,
      space_after_headers: false # #の後にスペースが無くても、h1等とする。
    }
    renderer = RougeRedcarpetRenderer.new(render_options)
    Redcarpet::Markdown.new(renderer, extensions).render(text).html_safe
  end
end
```

## html_safe => sanitize
html_safeではXSS対策としては駄目と知った。名前詐欺である。
[sanitizeヘルパーを使用した。ホワイトリスト方式。要参照](https://edgeapi.rubyonrails.org/classes/ActionView/Helpers/SanitizeHelper.html#method-i-sanitize)

```rb:app/views/posts/index.html.erb
# sanitize(html, options = {})
 <div id="capture" class="content">
    <%= sanitize(markdown(@post.content), tags: %w(div img h1 h2 h3 h4 h5 strong em a p pre code ), attributes: %w(class href)) %>
</div>
```

## 投稿内容のデータ化、AWSへの画像保存
最初はTwitterAPIを利用して、投稿から作成、DBに直接保存した画像でTwitter投稿しようとした。だが、Herokuでは画像が保持されない事、TwitterAPIの変更などいろいろ面倒なことが発生したので、最終的には画像をAWS S3に保存し、og:imageに添付する形を取った。

1. Webアプリ内で通常投稿
2. showページ表示（同時にhtml2canvasでBase64としてデータ取得、hidden_fieldに格納
3. Tweetボタン押す（Postされ、postモデル内でbase64をデコード
4. Active Storageを通して、AWS S3に保存

## [Active Storage](https://railsguides.jp/active_storage_overview.html)
Rail5.2からの機能で、今までのcarrievaveやpaperclip等を使わずに、クラウドストレージ等へのアップロードが容易になる。今回はAWS S3を使った。

```sh:terminal
# set up
rails active_storage:install

# rails g resource comment content:text
rails db:migrate
```

```rb:app/models/post.rb
class Post < ApplicationRecord
# 今回は1つの投稿につき、1枚の画像なので。複数なら => has_many_attached :prtscs
  has_one_attached :prtsc
end
```

```rb:app/config/environments/
# ファイル保存先変更
# development.rb
config.active_storage.service = :local
# production.rb
config.active_storage.service = :amazon
```

`rails credentials:edit`でAWSアクセスキーとシークレットキーを追加。

```yaml:config/credentials.yml.enc
aws:
  access_key_id: 
  secret_access_key: 
```

```yml:config/storage.yml
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

```rb:Gemfile
# gemが必要
gem 'aws-sdk-s3', require: false
# 今回は不要だったので、入れず。
gem 'mini_magick'
```

## [html2canvas](https://html2canvas.hertzen.com/)
[参考：htmlを画像化する方法(html2canvasの使い方)](https://wakubeku.com/?p=175)
jsはProgateレベルだったので、DOM操作は初めてで、なんか楽しかったぞ。

1. Tweetボタン押下時に、画像をPostするためのフォーム、hidden_fieldを用意
2. `html2canvas.js`を`app/assets/javascripts`ディレクトリ配下に保存。
3. html上に置くscriptコードを改修

```rb:app/views/posts/show.html.erb
<%= form_with(model: @post, local: true) do |form| %>
  <%= form.hidden_field :id, value: @post.id %>
  <%= form.hidden_field :prtsc, value: "" %>　# idはpost_prtscになる。
  <%= form.submit "Post", class:"btn btn-outline-dark", id:"tweet", value:"tweet" %>
<% end %>
```

```rb:app/views/layouts/application.html.erb
<script type="text/javascript">
  html2canvas(document.querySelector("#capture"),{scale:1, width:600}).then(canvas => {
    var base64 = canvas.toDataURL('image/jpeg', 1.0);
    document.getElementById('post_prtsc').setAttribute('value', base64);
  });
</script>
```

## Base64デコード
- 参照
  - [python-twitter で BASE64 形式の画像をツイートする](https://qiita.com/maguro_tuna/items/184f63e37f3724f18e33)
  - [base64でエンコードされた画像をActive Storageで保存する](https://qiita.com/ozin/items/5ec81a4b126b8ebf7a96)

```rb:app/models/post.rb
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

あとはposts_controllerで、paramsから受け取ったBase64データを上の`parse_base64(img)`で変換し、保存すれば完了。

## [AWS S3](https://aws.amazon.com/jp/s3/)
AWS上での登録、設定、バケット作成等は割愛。

## [Tweet button](https://publish.twitter.com/#)
公式で生成されるTweetボタンのURLを利用し、押下時にwindow.openでTweet投稿ページを開くようにした。rubyonrailsで用意した変数をjsに渡す`gem 'gon'`も考えたが、見送った。

```rb:app/views/layouts/application.html.erb
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

## og:imageに画像添付
なお、headのmeta情報セットには、`gem 'meta-tags'`を使用。[参照 : kpumuk/meta-tags](https://github.com/kpumuk/meta-tags)

### service_url()とurl_for()
- [参照：service_url() from api.rubyonrails](https://api.rubyonrails.org/classes/ActiveStorage/Variant.html#method-i-service_url)
- [参照：url_for() from rails guide](https://railsguides.jp/active_storage_overview.html#%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E3%81%AB%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%99%E3%82%8B)

基本的にはどちらも、ActiveStorageに保存したデータのUrlを取得するメソッドの様だ。
どちらもセキュリティの為にリンクの有効期限が短いみたいだが、違いが分からなかった。今回はTweetボタン押下し、Tweetした際にog:imageとして表示されればいい。

```rb:app/views/posts/show.html.erb
# 画像がActive StorageでAWS S3に保存されて入れば
<% if @post.prtsc.attached? %>
  <% set_meta_tags og:{image: @post.prtsc.service_url} %>
<% end %>
```

# Twitterログイン
[TwitterDeveloperAccount](https://developer.twitter.com/content/developer-twitter/ja.html)が必要。割愛。

- 参照
  - [gem 'omniauth-twitter'　github](https://github.com/arunagw/omniauth-twitter)
  - [[*Rails*] deviseの使い方（rails5版）](https://qiita.com/cigalecigales/items/f4274088f20832252374)
  - [ominiauth脆弱性に対するクックパドによるパッチ]](https://github.com/cookpad/omniauth-rails_csrf_protection)

```rb:app/models/user.rb
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

Twitterのニックネームが取得できるようになったので、元からあるUserのnameテーブルは削除した。

# 改修(加筆
## メディアクエリ
想定ユーザは殆どスマホなのに、PCで作成し、CSSをPCの見た目でやってた。折角SCSSでやってるので、変数を利用した。

```scss:app/assets/stylesheets/scaffold.scss
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

# 最後に
gist等がコードスクショをog:imageで表示してくれたら全て済むのでは

