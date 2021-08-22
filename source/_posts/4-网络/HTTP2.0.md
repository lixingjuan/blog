# 相关文章
1. [HTTP/2 简介-developers.google.com](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn)
2.



# HTTP/2 简介

## SPDY

2012年，google提出了SPDY的方案，优化了HTTP1.x的请求延迟，解决了HTTP1.x的安全性，具体如下：
1. **采用多路复用降低延迟**：多个请求采用一个TCP连接，解决了HOL blocking的问题，降低了延迟同时提高了带宽的利用率；
2. **请求优先级**： 多路复用带来的一个新的问题是，在连接共享的基础上，可能关键请求被阻塞。SPDY允许给各个请求设置优先级，这样重要的请求就是优先得到相应。比如浏览器加载首页，首页的html内容应该优先展示，之后才是各种静态资源文件、脚本文件等家在，这样可以保证用户第一时间看到网页内容。
3. **header压缩**: 采用合适的压缩算法对header进行压缩
4. **基于HTTPS的加密传输**: 使传输更加安全可靠
5. **服务端推送（server push）**: 采用了SPDY的网页，例如我的网页有一个sytle.css的请求，在客户端收到sytle.css数据的同时，服务端会将sytle.js的文件推送给客户端，当客户端再次尝试获取sytle.js时就可以直接从缓存中获取到，不用再发请求了。SPDY位于HTTP之下，TCP和SSL之上，这样可以轻松兼容老版本的HTTP协议(将HTTP1.x的内容封装成一种新的frame格式)，同时可以使用已有的SSL功能




## 为什么提出 HTTP/2 ?

谷歌为了解决现在http1.1 连接不好的问题，做出了SPDY，即http2.0的前身；
HTTP/2 兼容 HTTP1.1, 例如 HTTP METHOD，Status Code, URI ,以及大部分的 Header Fields

HTTP/2 通过以下方法减少 latency, 用来改进页面加载的速度
1. HTTP header 的压缩，采用HPack算法；
2. HTTP/2 的 **Server Push**，非常重要的一个特性。
3. 请求的pipeline;
4. 修复在HTTP 1.x的队头阻塞问题;
5. 在单个TCP连接里多工复用请求;










## HTTP2.0 和HTTP1.x相比新特性



HTTP2.0是SPDY的升级版，具有以下特性

1. **新二进制分帧层**：HTTP1.x的解析基于文本，HTTP2.0基于 **二进制**, 基于文本协议的格式解析存在天然缺陷，文本的表现形式有多样性，要做到健壮性考虑的场景必然很多，二进制则不同，只认0和1的组合，基于二进制协议的解析方便且健壮；
2. **多路复用，即连接共享**：即每一个request都是用作链接共享机制的，一个request对应一个id, 这样一个连接上可以有多个request, 每个连接的request可以随机的混杂在一起，接收方可以根据request 的id将request再归属到各自不同的服务端请求里；
3. **header压缩**：HTTP1.xd的header带有大量信息，而且每次传输都要发送，HTTP2.0使用 **encoder** 来减少需要传输的header的大小，通讯双方各自 **cache一份header filed表**，既避免了重复header的传输，又减小了需要传输的大小；（我看有个地方说维护一本字典啥啥的）
4. **服务端推送（server push）**：同SPDY一样，HTTP2.0也具有server push 的功能


## HTTP2.0 的一些关键词
1. 性能惊人———— 速度很快！
