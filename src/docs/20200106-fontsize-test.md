---
create: '2020-01-06'
author: Kawano Yudai
title: フォントサイズの確認
tags: [test]
---

## h2 tag あいうえお
つれづれなるまゝに、日くらし、硯にむかひて、心に移りゆくよしなし事を、そこはかとなく書きつくれば、あやしうこそものぐるほしけれ・・・

### h3 tag あいうえお
あいうえお祇園精舎の鐘の声、諸行無常の響きあり。 沙羅双樹の花の色、盛者必衰の理をあらはす。 奢れる人も久からず、ただ春の夜の夢のごとし。

**strong tag あいうえお**

1. ol list1
2.  ol list2
3.  ol list3

* ul list1
* ul list2
* ul list3

*italic あいうえお*

#### ruby
```ruby
require 'redcarpet'
markdown = Redcarpet.new("Hello World!")
puts markdown.to_html
```
#### scss
```scss
.content{display: none;}
.content .active{display:block;}
```

#### C++
```cpp
#include "stdafx.h"
#include <opencv2\core\core.hpp>
#include <opencv2\highgui\highgui.hpp>
#include <iostream>

#include <stdio.h>
#include "math.h"
#include "mask.h"
#include "BmpFileIO.h"
#include "ColorConv.h"
#include "Labeling.h"
#include "binarization.h"

using namespace std;
#pragma warning(disable : 4819 )

IplImage* img = 0;
int min_point, max_point, X1, X2;
int c_p = 0, c_p1 = 0, c_p2 = 0, c_p3 = 0;
```

> quote あいうえお
>> かくありし時過ぎて、世の中にいとものはかなく、とにもかくにもつかで、世に経ふ人ありけり。かたちとても人に似ず、心魂もあるにもあらで、かうものの要にもあらであるも、ことはりと思ひつつ、ただ臥し起き明かし暮らすままに、世の中に多かる古物語のはしなどを見れば、世に多かるそらごとだにあり、人にもあらぬ身の上まで書き日記して、めづらしきさまにもありなむ、天下の人の品高きやと問はむためしにもせよかし、とおぼゆるも、過ぎにし年月ごろのこともおぼつかなかりければ、さてありぬべきことなむ多かりける。

[a tag link あいうえお](http://google.com)

## katex

$$
y = x^3 + 2ax^2 + b
$$