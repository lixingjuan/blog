## 为什么提出 HTTP/2 ?

谷歌为了解决现在http1.1 连接不好的问题，做出了SPDY，即http2.0的前身；
HTTP/2 兼容 HTTP1.1, 例如 HTTP METHOD，Status Code, URI ,以及大部分的 Header Fields
HTTP/2 通过以下方法减少 latency, 用来改进页面加载的速度
1. HTTP header 的压缩，采用HPack算法；
2. HTTP/2的Server Push，非常重要的一个特性。
3. 请求的pipeline。
4. 修复在HTTP 1.x的队头阻塞问题。
5. 在单个TCP连接里多工复用请求
