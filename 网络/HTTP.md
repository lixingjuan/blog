- [一个 tcp 连接能发几个 http 请求](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/1)

## 一个 tcp 连接能发几个 http 请求
1. HTTP1, 只能发一个
2. HTTP1.1, 默认开启Connection: keep-alive，一个TCP连接可以发多个http请求，但是多个请求是串行执行
3. HTTP/2: 引入了多路复用技术 和二进制分帧，同个域名下的请求只需要占用一个 TCP 连接


## HTTP2减少网络延迟，提升网页加载速度的方法

1. 请求流水线；
2. 对HTTP头字段进行数据压缩（即HPACK算法）；
3. 对数据传输采用多路复用，让多个请求合并在同一TCP连接内。
4. 修复HTTP/1.0版本以来未修复的队头阻塞问题；
5. HTTP/2服务端推送（Server Push）；