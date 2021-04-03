# Python Web スクレイピング
#### 参考： [Qitta](https://qiita.com/mochio/items/dc9935ee607895420186#%E3%81%AF%E3%81%98%E3%82%81%E3%81%AB)
制作期間：2021/04/01-2021/04/02
## はじめに
この記事は、Python + Selenium によるWebスクレイピングの初心者向けに、簡単なスクレイピングを実際に体験してもらう際の指針となるために作れました。しかし、執筆者がそもそもWebスクレイピングに関して深い理解があるわけでもない人間なので、如何せん他の優秀な記事を寄せ集めた記事になってしまった感は拭えません、あらかじめご了承ください。

## 事前準備
### 1. Anaconda
まずAnacondaをインストールする。これは、必ずしも必要な作業ではないのかもしれないが、今後Python関連の作業をするならば、インストールしておいて損はないだろう。

- Anaconda : [for Windows](https://www.python.jp/install/anaconda/windows/install.html)
- Anaconda: [for Mac](https://www.python.jp/install/anaconda/macos/install.html)

以上の記事を参考にすれば、問題なくインストールできるはずである。
### 2. Chrome Driver
### Mac
Macであれば、この手順は実に容易い。Homebrewがすでに入っている場合は、以下のコマンドを実行するだけでよい。
```
$ pip install selenium
$ brew install chromedriver
```
（※Homebrew未導入の場合は　[Homebrew](https://brew.sh/index_ja)から導入すること）
（注：いくつかの記事では、
>`pip`ではなく`conda`を使う方が、Anacondaを導入済の場合は適切

との記述があったが、真偽のほどは定かでない。）

### Windows
まず、自分のChromeのバージョンを確認する。
確認方法は、`設定`→`Chromeについて`で現在のバージョンを確認することができる。
その次に[ここ](https://chromedriver.chromium.org/downloads)にアクセスし、自分のChromeのバージョンに一致するものをダウンロードする。ダウンロードしたChromeDriverは後で使用するので、スクレイピング用のディレクトリまで移動する。

windowsの場合は、Macの場合と違って`Terminal`ではなく`jupyter nootebook(Jupyter Lab)`の方に以下のコマンドを書く
```python=test.py
!pip install selenium
```
また、さらにChromedriverの絶対パスを`executable path`として通す必要がある。
具体的には、以下のように記述する。
```python=
# import 群
from selenium import webdriver
import time 
import pandas as pd
# google chrome driver
browser = webdriver.Chrome(executable_path=r"C:\path\chromedriver.exe")
```
このコマンドを実行すると自動的にChromeが立ち上がるがこれは想定通りの動作なので安心してほしい。
## 実践
### よく使うメソッド（基礎）
#### 特定のURLに遷移したいとき
```python=
browser.get("url")
```
このとき、`("url")`のところに、具体的に`string`型にしたURLを打ち込んでもよいが、せっかくなので
```python=
url = "https://google.com"
browser.get(url)
```
としたほうが、変数等をうまく使っていると言えるだろう。
#### ひとつ前のページに戻りたいとき
```python=
browser.back()
```
#### ひとつ先に進みたいとき
```python=
browser.forward()
```
#### ブラウザを更新するとき
```python=
browser.refresh()
```
#### 現在のURLを知りたいとき
```python=
# 変数名は、分かるものならなんでもよい
url_crt = browser.current_url
```
#### タイトルを取得するとき
```python=
# 変数名は、分かるものならなんでもよい
webpage_title = browser.title
```
#### ページのソースを取得したいとき
```python=
browser.page_source 
```
#### ウィンドウを閉じたいとき
これは手動でしても問題ないが、Webスクレイピングでデータを取得してきた後に自動で閉じるところまでした方が、カッコいいから、とか、楽だからとか、そういった理由から使う。
```python=
browser.close()
```
#### すべてのウィンドウを閉じたいとき
```python=
browser.quit()
```
以上の紹介した、ことで基礎的なメソッドは終了である。

### HTMLとXpath
#### はじめに
Webスクレイピングをするには、避けて通れないことがある。それは、HTMLの基本的な要素への理解である。これがないと、Webページの特定の情報のみをとってくるとか、自動ログインを実装したりすることは実現できない。
#### HTML
HTMLについて、深く理解する必要は実はない。しかし、以下に示す記事の内容を８割程度理解していないと、ただコードを暗記することになりかねないので、しっかりと以下の記事を読むこと。

<**注意**この順番で読むこと>

1. [HTMLの基礎（MDN)](https://developer.mozilla.org/ja/docs/Learn/Getting_started_with_the_web/HTML_basics)
2. [HTMKテキストの基礎(MDN)](https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/HTML_text_fundamentals)
3. [ドキュメントとwebサイトの構造(MDN)](https://developer.mozilla.org/ja/docs/Learn/HTML/Introduction_to_HTML/Document_and_website_structure)

#### Xpath
HTMLとは違い、必須というわけではないが、知っておいて損はないので、時間に余裕があるのなら、読んでおくとよい。

- [Xpathについて(Octoparse)](https://www.octoparse.jp/blog/xpath-introduction/#:~:text=XPath%20(XML%20Path%20Language)%E3%81%A8,%E6%99%82%E3%81%AB%E3%82%88%E3%81%8F%E5%88%A9%E7%94%A8%E3%81%97%E3%81%BE%E3%81%99%E3%80%82)

上記の記事のなかでも、とくに有用なのは、**３.Xpathを表示・書くには**の章である。
後述するChromeの検証機能の使い方も概説されているので、少しだけでもよいの目を通しておくことを推奨する。

### Chrome 検証ツール
すでにご存知の方が多いかもしれないが、一応、参考記事と概説を書いておく。
- [検証ツールの使い方(progate)](https://prog-8.com/docs/html-dev)

簡単にいうと、検証ツールを使うと、Webサイトの構成要素であるHTMLやCSSをみることができるだけでなく、実際に見えているものと、コードとの対応関係を検証することができるツールということである。    


### よく使うメソッド（基本）（要素取得）
これまでで学んできた、HTMLのClassや、Xpathといった概念を既知として解説する。
#### クラスから要素を取得
```python=
browser.find_element_by_class_name("classname")
```
もちろん、上の`classname`のところには、自分の取得したいものがあるクラス名をあてがう。ただ、これでは、とってきただけで変数に格納しなければ意味がないので実際には以下のようにつかう。
```python=
account_elem = browser.find_element_by_class_name("Account")
```
この後で紹介するメソッド等を用いて、この`account_elem`という変数に色々と処理を加える。
#### idから要素を取得
```python=
elem = browser.find_element_by_id("id")
```
クラスのときとほぼ同じ、異なるのは取得する要素を何で特定するのかだけ

#### Xpathから要素を取得
```python=
elem = browser.find_element_by_xpath("xpath")
```
xpathで指定している。
### よく使うメソッド（基本）（動作）
#### クリックしたいとき
```python=
# 要素取得
webpage_button_ok = browser.find_elemnt_by_xpath("xpath")
# クリック
webpage_button_ok.click()
```
手順としては、まず要素をとってきてそれにクリックメソッドでクリックする動作を実現するという手順である。これで実際にchromedriverの方でクリックができた。
(もちろん、上記のようにxpathで要素を取得せずとも他の方法でできるのならば、一向に構わない。)


