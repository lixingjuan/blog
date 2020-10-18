https://www.oschina.net/news/77354/http-get-post-different

1. GET在浏览器回退时是无害的，而POST会再次提交请求
2. GET产生的URL地址可以被Bookmark，而POST不可以
3. GET请求会被浏览器主动cache，而POST不会，除非手动设置
4. GET请求只能进行url编码，而POST支持多种编码方式
5. GET请求参数会被完整保留在浏览器历史记录里，而POST中的参数不会被保留
6. GET请求在URL中传送的参数是有长度限制的，而POST么有
7. GET比POST更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
8. GET参数通过URL传递，POST放在Request body中
9. GET产生一个TCP数据包；POST产生两个TCP数据包
   1.  对于GET方式的请求，浏览器会把http header和data一并发送出去，服务器响应200（返回数据）
   2.  而对于POST，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok（返回数据）。





# get请求url的限制

## 浏览器

1. IE
IE浏览器（Microsoft Internet Explorer） 对url长度限制是2083（2K+53），超过这个限制，则自动截断（若是form提交则提交按钮不起作用）。
2. firefox
firefox（火狐浏览器）的url长度限制为 65 536字符，但实际上有效的URL最大长度不少于100,000个字符。
3. chrome
chrome（谷歌）的url长度限制超过8182个字符返回本文开头时列出的错误。
4. Safari
Safari的url长度限制至少为 80 000 字符。
5. Opera
Opera 浏览器的url长度限制为190 000 字符。Opera 9 地址栏中输入190 000字符时依然能正常编辑。




## 服务器
1. Apache
Apache能接受url长度限制为8 192 字符
2. IIS
Microsoft Internet Information Server(IIS)能接受url长度限制为16 384个字符。
这个是可以通过修改的（IIS7）configuration/system.webServer/security/requestFiltering/requestLimits@maxQueryStringsetting.<requestLimits maxQueryString="length"/>
3. Perl HTTP::Daemon
Perl HTTP::Daemon 至少可以接受url长度限制为8000字符。Perl HTTP::Daemon中限制HTTP request headers的总长度不超过16 384字节(不包括post,file uploads等)。但当url超过8000字符时会返回413错误。
这个限制可以被修改，在Daemon.pm查找16×1024并更改成更大的值。
4. ngnix
可以通过修改配置来改变url请求串的url长度限制。

client_header_buffer_size 默认值：client_header_buffer_size 1k

large_client_header_buffers默认值 ：large_client_header_buffers 4 4k/8k

由于jsonp跨域请求只能通过get请求，url长度根据浏览器及服务器的不同而有不同限制。
若要支持IE的话，url长度限制为2083字符，若是中文字符的话只有2083/9=231个字符。
若是Chrome浏览器支持的最大中文字符只有8182/9=909个。