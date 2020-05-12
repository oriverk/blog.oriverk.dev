---
date: '2019-03-18'
update: '2019-03-18'
title: 'Qiita: Rubyリファレンスを読んだのでメモ'
tags: Qiita Ruby memo
author: OriverK
slide: false
---

from Qiita: [Rubyリファレンスを読んでの、メモ](https://qiita.com/OriverK/items/49148e7116b86e3f36a9)

- 参照
  - [オブジェクト指向スクリプト言語 Ruby リファレンスマニュアル](https://docs.ruby-lang.org/ja/2.6.0/doc/index.html)　を読んだ。

- 後回しにした項目(別記事でも作成）
    - [正規表現](https://docs.ruby-lang.org/ja/2.6.0/doc/spec=2fregexp.html)
    - [組み込みライブラリ](https://docs.ruby-lang.org/ja/2.6.0/library/_builtin.html)
        - ホントに長かったので、メモせず、読んで覚えることにしました
    - [ヒアドキュメント (行指向文字列リテラル)](https://docs.ruby-lang.org/ja/2.6.0/doc/spec=2fliteral.html)
    - [手続きオブジェクトの挙動の詳細](https://docs.ruby-lang.org/ja/2.6.0/doc/spec=2flambda_proc.html)


# 字句構造
## 予約語
回避方法はあるが、使わない方が身のため。

```
BEGIN    class    ensure   nil      self     when
END      def      false    not      super    while
alias    defined? for      or       then     yield
and      do       if       redo     true     __LINE__
begin    else     in       rescue   undef    __FILE__
break    elsif    module   retry    unless   __ENCODING__
case     end      next     return   until
```

# 変数と定数
## クラス変数@@
@@で始まる変数はクラス変数

親クラスに、子クラスで既に定義されている同名のクラス変数を追加したら、 子クラスのクラス変数が上書きされる。

```rb:
class Foo
end
class Bar < Foo
  @@v = :bar
end
class Foo
  @@v = :foo
end
class Bar
  p @@v       #=> :foo
end
```

## 定数
- アルファベット大文字で始まる
- 定義されている定数に代入を行おうとすると、警告を出すが、代入される
- クラス定義の外(トッ プレベル)で定義された定数は Object に所属する
    - あるクラスまたはモジュールで定義された定数を外部から参照する ためには`::`演算子を用いる。
    - Objectクラスで定義の定数(トップレベルの定数と言う)を確実に参照するには左辺無し。

```rb
module M
  I = 35
  class C
  end
end
p M::I   #=> 35
p M::C   #=> M::C
p ::M    #=> M

M::NewConst = 777   # => 777
```

# リテラル
## バックスラッシュ記法
文字列中でバックスラッシュの後に記述する文字によって、意味を持たせる事ができます。

- \t　タブ(0x09)
- \v　垂直タブ(0x0b)
- \n　改行(0x0a)
- \e　エスケープ (0x1b)
- \s　空白 (0x20)
- \nnn　8 進数表記 (n は 0-7)
- \xnn　16 進数表記 (n は 0-9,a-f)


## %記法
バックスラッシュの数をコードから減らす効果
配列式では、文字列の配列やシンボルの配列を簡単に表現できる

- %!STRING! または　%Q!STRING!: ダブルクォート文字列
- %q!STRING! : シングルクォート文字列
- %w!STRING! : 要素が文字列の配列(空白区切り)

```rb
%w(foo bar bazz)
== ['foo', 'bar', 'baz']
```

- %W!STRING! : 要素が文字列の配列(空白区切り)。式展開、バックスラッシュ記法が有効

```rb
v = "c d"
%W(a\ b #{v}e\sf #{})
=> ["a b", "c de f", ""]
```

- %s!STRING! : シンボル。式展開、バックスラッシュ記法は無効
- %i!STRING! : 要素がシンボルの配列(空白区切り)
- %I!STRING! : 要素がシンボルの配列(空白区切り)。式展開、バックスラッシュ記法が有効

# 演算子
## 優先順位
&& > || > and or

```rb
a && b || c   #=> (a && b) || c
a || b && c   #=>  a || (b && c)
```

## 再定義できない演算子
```
 =  ?:  ..  ...  not  &&  and  ||  or  ::
```

## 多重代入
```rb
foo, bar = [1, 2]       # foo = 1; bar = 2
foo, bar = 1, 2         # foo = 1; bar = 2
foo, bar = 1            # foo = 1; bar = nil

foo, bar, baz = 1, 2    # foo = 1; bar = 2; baz = nil
foo, bar = 1, 2, 3      # foo = 1; bar = 2
foo      = 1, 2, 3      # foo = [1, 2, 3]
*foo     = 1, 2, 3      # foo = [1, 2, 3]
foo,*bar = 1, 2, 3      # foo = 1; bar = [2, 3]
# 左辺の最後の式の直前に * がついていると、対応する 左辺のない余った要素が配列として代入
```

## &&と||
- `&&`
  - 左辺を評価し、結果が偽なら、その値(つまり nil か false) を返す。左辺の評価結果が真なら、右辺を評価しその結果を返す
- `||`
  - 左辺を評価し、結果が真なら、その値を返す。左辺の評価結果が偽なら、右辺を評価し その評価結果を返す。

## 条件演算子
```rb
式1 ? 式2 : 式3
# 上と下は同じ
if 式1 then 式2 else 式3 end
# 例
x = 123456789
x%3 == 0 if "3x" : "hazure"
=> 3x
```

# 制御構造
## unless
unlessはifと反対で、条件式が偽の時にthen以下の式を評価。elsifを指定できない。

## 制御構造(ifなど)の修飾子
式 if 式の様に、一行で書くやつ。
右辺の条件が真/偽の時にに、左辺の式を評価してその結果を返す。

## retry
rescue 節で begin式からもう一度実行するのに使用。 
処理が成功するまで処理を繰り返すようなループを作れる。

```rb
begin
  do_something # exception raised
rescue
  # handles error
  retry  # restart from beginning
end
# rescue 節以外で retry が用いられた場合にはSyntaxError`
```

# クラス/メソッドの定義
## 呼び出し制限
- public : 制限なし
- private : 関数形式でしか呼び出せない
- protected : ソッドを持つオブジェクトが selfであるコンテキストでのみ呼び出し可能。
- nitializeは定義する場所に関係なく常に private 

```rb
class Foo
  def foo
   p caller.last
  end
  protected :foo
end
```

## alias
メソッドあるいはグローバル変数に別名をつけます。
メソッド名には識別子そのものかリテラル/シンボル を指定

```rb
# alias 新メソッド名 旧メソッド名
# alias 新グローバル変数名 旧グローバル変数名
alias foo bar
alias :foo :bar
alias $MATCH $&
```

## undef メソッド名
メソッドの定義を取り消す

## defined? 式
式が定義されていなければ、偽を返す。定義されていれば式の種別を表す文字列を返す

# Ruby用語集
面白かった
[リンク](https://docs.ruby-lang.org/ja/2.6.0/doc/glossary.html)
