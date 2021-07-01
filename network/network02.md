# ネットワーク基礎2
#### 参考：http://x68000.q-e-d.net/~68user/net/net-2.html , http://x68000.q-e-d.net/~68user/net/net-3.html
##### 2021/04/01(木) 22:00

### クライアントとサーバー

- **クライアント**: ユーザー（あなた）が操作しているコンピューターのこと、狭義にはユーザーが操作しているウェブブラウザのこと
- **サーバー**：　ユーザーがアクセスしている`www.cs.gunma-u.ac.jp`のこと、もちろんこれは一例であるが、

#### クライアントとサーバーの語源
>あなたのブラウザ (クライアント) が「この web を見たいので内容を送ってくれ」 とリクエストを WWW サーバに送ると、WWW サーバは指定された web の内容を 送り返すのです。 つまりクライアントが依頼 (=client) し、サーバはそれを受けて 奉仕する (=service) する、という関係です。

イメージ図
![server-client](https://d1gt4pceznpvut.cloudfront.net/files/user/sys_imgs/article/1418_018a.jpg?v=1490872602)

### ポート番号
インターネットの中から１台のコンピューターを指定するには、IPアドレスを使えば良いのだが、実際問題として１つのコンピューターでは複数のサーバーソフトウェアを動かすことができるので、たとえIPアドレスで1台のコンピュータを特定したとしても、 そこで動いているどのサーバプログラムとデータをやりとりしたいのかを 特定できない。

そこで出てくるのがポート番号というものです。 IPアドレスによって世界中から一台のコンピュータを特定でき、 さらにポート番号を指定することで、その中の一つのサーバプログラムを 特定できます。

詳細：
> よく知られているのは HTTP の80、FTP の21、SMTP の25、POP3 の110などです。 これらは「well-known port (よく知られたポート)」と言われ、 事実上の標準となっています。 プロトコル名とポート番号の対応は、UNIX なら `/etc/services` に あります。Windows なら `C:\windows\services` です。ここに載っている プロトコルは「well-known port」と言えるでしょう。

#### HTTPの場合
**HTTP サーバ**(＝WWWサーバ)はポート80番を常に見張っています。
クライアント(ブラウザ)は、`/etc/service `のポート対応表を見て HTTP のポート番号が80であることを知り、指定されたホストの ポート 80 番に接続 (connect) します。 そしてクライアントは HTTP サーバに「このURLのデータを送ってくれ」という **リクエスト**を送ります。HTTP サーバは指定のデータを送り返し、ブラウザはそれを 画面に表示するわけです。

注意したいのは、OS が面倒を見るのはサーバへの接続とデータのやりとり **だけ**であることです。 OS はクライアントとサーバの間で通信されるデータの内容には干渉しません。 ですから通信内容や通信の手順については、クライアントとサーバの間で 事前に決めておかなくてはなりません。この取り決めを**プロトコル**と言います。 例えば HTTP サーバとデータのやりとりをする場合、HTTP プロトコルについて 知らなくてはいけません。
