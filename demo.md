1. 存储
   1. cookie
      1. 共300个， 每个域20
      2. 每条2**12
      3. 共2**13-1 字节
   2. sessionStorage
      1. 关闭tab销毁
      2. tab不共享
      3. 超过最大限制报错：超过配额
   3. localStorage
      1. 每个域5M
2. HTTP2.0（SPDY协议）
   1. 多路复用二进制
   2. HPACK, 头部压缩
   3. 服务器推送
3. HTTP3.0
   1. UDP
   2. 解决多路复用，一个包阻塞，整条流都阻塞
4. 简单请求 & 复杂请求
   1. get/head/post
   2. 头字段
      1. accept
      2. accept-language
      3. content-language
      4. content-type
         1. text/plain
         2. multiple/form-data
         3. application/x-www-form-urlencoded
   3. 请求中没有使用 ReadableStream 对象
   4. 请求中的任意 XMLHttpRequest 对象均没有注册任何事件监听器；XMLHttpRequest 对象可以使用 XMLHttpRequest.upload 属性访问。
5. bfc
   1. display:flow-root，这是唯一没有副作用的一种
   2. display的值是inline-block、table-cell、flex、table-caption或者inline-flex
   3. float的值不是none
   4. overflow的值不是visible
   5. position的值不是static或者relative。
3.