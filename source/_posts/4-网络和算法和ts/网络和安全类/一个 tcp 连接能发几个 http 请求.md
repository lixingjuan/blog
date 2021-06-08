- [一个 tcp 连接能发几个 http 请求](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/1)

1. HTTP1, 只能发一个
2. HTTP1.1, 默认开启Connection: keep-alive，一个TCP连接可以发多个http请求，但是多个请求是串行执行
3. HTTP/2: 引入了多路复用技术 和二进制分帧，同个域名下的请求只需要占用一个 TCP 连接