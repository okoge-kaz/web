# Algorithm

## `std::sort`

[reference](https://cpprefjp.github.io/reference/algorithm/sort.html)

```cpp=
template <class RandomAccessIterator>
  constexpr void sort(RandomAccessIterator first,
                      RandomAccessIterator last); 
                      // (1) C++20
```
一般的には、上記のように`std::begin(),std:end()`を渡すのが普通だが、実はオーバーロードとして

```cpp=
template <class RandomAccessIterator, class Compare>
  constexpr void sort(RandomAccessIterator first,
                      RandomAccessIterator last,
                      Compare comp);              
                      // (2) C++20
```

というものがあり、`bool compare(const edge &edge1, const edge &edge2) {return edge1.w < edge2.w; }`という関数を作っておいて、以下のように`std:sort`に渡すだけで比較ができる。（恥ずかしながら知らなかった。JavaScriptでは知っていたが...）

```cpp=
sort(edges.begin(), edges.end(), compare);
```

詳しくはリンク先のリファレンスに書かれている。(2021/9/13)

(この事実は最小全域木のクラスカル法のライブラリ作成時に知ったこと)

## `std::deque`

[reference](https://cpprefjp.github.io/reference/deque/deque.html)

リファレンスにも書いてある通り、`std::deque`は
>全ての場合においてランダムアクセスイテレータを介して個々の要素へアクセス可能であり、ストレージは（必要に応じて拡大または縮小して）自動的に処理される。

とあるようにランダムアクセスイテレーターである。すなわち、`std::vector`のように

```cpp=
deque<int> que;
for(int i=0;i<n;i++){
  int a; cin >> a;
  que.push(a);
}

cout << que[3] << endl; 
```
のようにアクセスが可能。またこれは`O(1)`すなわち定数時間である。

詳細は、[Link: `std::deque::operator[]`](https://cpprefjp.github.io/reference/deque/deque/op_at.html)を参考のこと。

しばしば、ランダムアクセスできないと思ってしまうが、できることを忘れずに。
（本当は、一度詳しく実装を見てみると良いのだろうが...）

