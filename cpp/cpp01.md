# C++ 入門

#### 2021/04/02~

#### 参考記事

1. [ゼロから学ぶ C++](https://rinatz.github.io/cpp-book/)
2. [ロベールの C++教室](http://www7b.biglobe.ne.jp/~robe/cpphtml/mainmenu.html)
3. [APG4b](https://atcoder.jp/contests/apg4b/tasks)
4. [江添亮の C++入門](https://cpp.rainy.me/)
5. [C++言語レファレンス](https://docs.microsoft.com/ja-jp/cpp/cpp/cpp-language-reference?view=msvc-160&viewFallbackFrom=vs-2019)
6. [cpprefjp-C++日本語レファレンス](https://cpprefjp.github.io/)
7. [cppreference.com](https://ja.cppreference.com/w/cpp/container)

#### 参考書籍

- 新・明解 C++入門

#### 注意事項

この記事を執筆する際、極力、誤字脱字等の誤植がないように勤めましたが、いくらかは誤植があるかもしれません。また、執筆者の理解不足から不適切な表現が見受けられるかもしれません。その場合は、[Twitter](https://twitter.com/Okoge_Kaz)までご連絡ください。

### 本編

#### 基本構文

##### 浮動小数点数

`float`は 32bit の大きさをもち、`double`は 64bit の大きさを持ちます。また、`double`の方が`float`に比べて計算精度が高くなっています。`long double`という規格もありますが、Microsoft Visual C++ では`double`と同じ精度になっています。GCC では、80bit 拡張倍数精度となっているようです。
[参考 1](https://docs.microsoft.com/ja-jp/cpp/cpp/data-type-ranges?view=msvc-160),[参考 2](https://qiita.com/mod_poppo/items/8860505f38e2997cd021#gcc)

##### 配列

```cpp=
int dp[100];
```

このように初期化すると処理系によっては、すべてが`0`で初期化されない場合がある。安全をきすならば、以下のようにするべし

```cpp=
int dp[100] = {};
```

[参考](https://rinatz.github.io/cpp-book/ch03-01-arrays/)

##### vector

```cpp=
#include <vector>
using namespace std;
int main(){
    int N;
    cin >> N;
    vector<int> vec(N);
}

```

以上のように使う。末尾の要素を取り出したい時は

```cpp=
int last = vec[-1];
```

とすることもできる。
末尾への追加は`push_back()`または`emplace_back()`で行う。`emplace_back()`の方が、パフォーマンスが良いことが多いようではあるが、詳細は著者にはわからない。　参考：[3.5 ベクタ](https://rinatz.github.io/cpp-book/ch03-05-vectors/)

##### メンバ関数

1. `begin`先頭の要素を指すイテレーターを取得する。[begin()](https://cpprefjp.github.io/reference/vector/vector/begin.html)

2. `end` 末尾に**次**を指すイテレータを取得する。[end()](https://cpprefjp.github.io/reference/vector/vector/end.html)

3. `assign(n, t)`vector の配列に$n$個の値$t$を代入する。 [assign](https://cpprefjp.github.io/reference/vector/vector/assign.html)

4. `emplace_back()`直接構築で新たな要素を末尾に追加する。[emplace_back](https://cpprefjp.github.io/reference/vector/vector/emplace_back.html)

5. `emplace`,`insert`任意の位置に要素を直接代入。[emplace](https://cpprefjp.github.io/reference/vector/vector/emplace.html)、[insert](https://cpprefjp.github.io/reference/vector/vector/insert.html)

6. `erase`指定した要素を削除する。

```cpp=
vector<int> array(N);
array.erase(interator_position);
array.erase(iterator first, iterator last);
```

上記のように用いる。 [erase](https://cpprefjp.github.io/reference/vector/vector/erase.html)

7. `pop_back()`末尾の要素を削除する。[pop_back()](https://cpprefjp.github.io/reference/vector/vector/pop_back.html)

8. `resize()`要素数を変更する。`.resize(size);`と使用する。[resize](https://cpprefjp.github.io/reference/vector/vector/resize.html)

#### STL

STL について[Microsoft](https://docs.microsoft.com/ja-jp/cpp/standard-library/cpp-standard-library-header-files?redirectedfrom=MSDN&view=msvc-160)
STL コンテナライブラリ[cppreference.com](https://ja.cppreference.com/w/cpp/container)

##### algorithm

###### unique

`unique` 重複した要素を除くことができる。この関数の動作の概要としては、`1`隣り合った重複要素を除く`2`重複要素を除いたものを先頭に集める`注意`コンテナの要素数は減少しない。[unique](https://cpprefjp.github.io/reference/algorithm/unique.html)

```cpp=
//重複要素を完全に削除する。
vector<int>vals(N);
// 代入処理
sort(vals.begin(), vals.end());
vals.erase(unique(vals.begin(),vals.end()),vals.end());
```

上記のコードで`std::sort`を行っているのは、`unique`が隣り合った重複要素しか削除しないためである。競技プログラミングにおいて`座標圧縮`を行う際などによく用いる。
さらに詳しくは、[Qiita](https://qiita.com/ysk24ok/items/30ae72f4f1060b088588)

###### max

`max`同じ型の２値のうち最大値を取得する。[cppref](https://cpprefjp.github.io/reference/algorithm/max.html)

```cpp=
int a,b;
cin >> a >> b;
int larger_number = max(a,b);
```

というように使用する。競技プログラミング頻出
競技プログラミングでの使用法: [Qitta](https://qiita.com/e869120/items/518297c6816adb67f9a5)

###### min

`min`　同じ型の２値のうち最小値を取得する。使用法は、`max`と同様。[cppref](https://cpprefjp.github.io/reference/algorithm/min_element.html)

###### max_element

`max_element` `[first,last)`という半開半閉区間において最大要素を示す最初のイテレーターを取得する。計算量等は[cppref](https://cpprefjp.github.io/reference/algorithm/max_element.html)

###### min_element

`min_element` `[first,last)`という半開半閉区間において最小要素を示す最初のイテレーターを取得する。計算量等は[cppref](https://cpprefjp.github.io/reference/algorithm/min_element.html)

###### next_permutation

`next_permutation` 与えられた時点での順列を起点として辞書順によるその次の順列を生成する。与えられた順列のすべての場合を列挙したい場合は、あらかじめ`sort`が必要となる。一般的には`while`& `do`構文で実装されることが多い。[cppref](https://cpprefjp.github.io/reference/algorithm/next_permutation.html)
競技プログラミングにおける使用法 [APG4b](https://atcoder.jp/contests/apg4b/tasks/APG4b_ad?lang=ja)　 ← ページの末尾周辺に記載されています。

###### remove

`remove`　指定された要素を取り除く。`[first,last)`内にある値のうち、指定した値と等しいものを取り除き、有効な要素を前方向に寄せる。これをより、正確に書くと[cppref](https://cpprefjp.github.io/reference/algorithm/remove.html)のようになる。具体的な使用方法は下記のとおり

```cpp=
vector<int> v = {3,1,4,1,5,9,2};
auto result_vec = std::remove(v.begin(),v.end(),1);
// result_vec = {3,4,5,9,2}
```

###### replace

`replace` 指定された値と一致する要素を指定された値に置き換える。
詳細な説明は[cppref](https://cpprefjp.github.io/reference/algorithm/replace.html)

```cpp=
vector<int> v = {3,1,4,1,5,9,2};
// 1 を　7　で置き換える
auto result = std::replace(v.begin(),v.end(),1,7);
// result = {3,7,4,7,5,9,2}
```

###### reverse

`reverse` 要素の並びを逆にする。
昇順で`sort`したものを`reverse`することで降順にすることが[APG4b](https://atcoder.jp/contests/apg4b/tasks/APG4b_o)で紹介されている。

###### search

`search`
[cppref](https://cpprefjp.github.io/reference/algorithm/search.html)

###### sort

`sort` 範囲を並べ替える。オプションをつけることで、昇順、降順のどちらにもできる。

```cpp=
vector<int> vec(N);
for(int i=0;i<N;i++) cin >> vec[i];
// 昇順の時
auto ans = sort(vec.begin(),vec.end());
// 降順のとき
auto res = sort(vec.begin(),vec.end(),greater<int>());
```

[cppref]()

###### binary_search

`binary_search` 二分探索法による探索を行う。戻り値が`bool`なので実用的には、`lower_bound`,`upper_bound`を使うのが良いだろう。計算量等は、[cppref]()

###### lower_bound

`lower_bound` 指定された要素以上の値が現れる最初の位置のイテレーターを取得する。見つからなかった場合は`.last()`を返す。

```cpp=
vector<int>vec(N);
//値代入
int x;
cin >> x;//探したい値
auto place = lower_bound(vec.begin(),vec.end(),x);
if(place == vec.last()){
    cout << "Not found" << endl;
    return 0;
}else{
    cout << place - vec.begin() << endl;//位置（0-index）
}
```

[cppref]()

###### upper_bound

`upper_bound` 指定された要素より大きい値が現れる最初の位置のイテレーターを取得する。`lower_bound`とほぼ同じ。実は、`lower_bound`と`upper_bound`のふたつを上手く使うと指定した値が何個あるかわかる。

```cpp=
vector<int>vec(N);
// 値代入
int x, cin >> x;
int cnt = upper_bound(vec.begin(),vec.end(),x) - lower_bound(vec.begin(),vec.end(),x);
cout << cnt << endl;
```

[cppref]()

###### includes

`includes`
[cppref]()

###### find

`find`
[cppref]()

###### find_if

`find_if`
[cppref]()

###### fill

`fill`
[cppref]()

###### copy

`copy`
[cppref]()

###### count

`count`
[cppref]()

##### set

平衡二分木の実装の際に使うらしいが執筆者が勉強不足なため、伝聞

```cpp=
set<int> nums;
for(int i=0;i<N;i++){
    int num;
    cin >> num;
    nums.insert(num);//これで追加
}
// 以下で削除
int b, cin >> b;
nums.erase(b);
```

[cppref](https://cpprefjp.github.io/reference/bitset.html)
[参考](https://rinatz.github.io/cpp-book/ch03-07-sets/)

##### bitset

##### inline

新・明解`C++`入門には、p.232 に「関数の呼び出し作業や、それに伴う引数や返却値の受け渡しのコストが生じる」ことを防ぐためにインライン関数を用いるとある。しかし、[ここ](https://github.com/EzoeRyou/cpp17book/blob/master/035-cpp17-core-inline-variables.md)には、「`inline`関数の意味は、「関数を強制的にインライン展開させるための機能」ではない。」と書かれている。`C++`のどのバージョンから現状のような`inline`の役目に変化したのかは、執筆者には知識がない。

#### ポインタ

#### クラス

注意：本セクションは[ゼロから学ぶ C++](https://rinatz.github.io/cpp-book/ch07-01-data-members/)からのほぼ引用です。
**クラス**・・・変数と関数を集約した型を作るための仕組み。

##### データメンバ

クラスがもつ変数をデータメンバという。

##### 継承と public & private

以下の記事のアクセス指定子の項目に詳しくある
[ゼロから学ぶ C++](https://rinatz.github.io/cpp-book/ch07-03-inheritance/)

##### コンストラクタ

Union-Find や Dijkstra 法などのライブラリのなかでわからない記述があったが、以下のデータメンバの初期化の箇所を読めばわかった。
[ゼロから学ぶ C++](https://rinatz.github.io/cpp-book/ch07-05-constructors/)

#### テンプレート

#### デバッグ

以下の記事を参考にすれば十分である。
[C++入門 デバッグ](https://rinatz.github.io/cpp-book/debug-vscode/)

#### 関連書籍

[Effective Modern C++](https://books.rakuten.co.jp/rb/13388903/)
