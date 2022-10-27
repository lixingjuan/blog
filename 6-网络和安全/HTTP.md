- [一个 tcp 连接能发几个 http 请求](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/1)

## 一个 tcp 连接能发几个 http 请求
1. HTTP1, 只能发一个
2. HTTP1.1, 默认开启Connection: keep-alive，一个TCP连接可以发多个http请求，但是多个请求是串行执行
3. HTTP/2: 引入了多路复用技术 和二进制分帧，同个域名下的请求只需要占用一个 TCP 连接



## HTTP

三次握手
1. 客户端：syn
2. 服务端：ack+syn
3. 客户端：ack


- 延迟重复分组到达服务器
- TCP可靠传输怎么保证？
  1. 报文段从“运输层”交付给“应用层”序号排序
  2. 超时重传
  3. 拥塞控制：根据网络速度，调整单次发送的分组数量

四次挥手
   - 两对FIN+ACK



## HTTP2


1. 基于SPDY协议
2. 多路复用改为使用二进制压缩而非明文
3. 头部压缩, HPACK算法
4. 服务端推送



## HTTP3

在UDP上，使用QUIC协议，主要解决**HTTP2队头阻塞**问题


