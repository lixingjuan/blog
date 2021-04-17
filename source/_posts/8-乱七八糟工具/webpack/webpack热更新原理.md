# 大致理解


1. 利用webpack-dev-serve:
   1. WDS不刷新浏览器;
   2. WDS不生成文件，而是存放在内存里;
   3. 需要使用使用webpack内置的HotModuleReplacementPlugin插件;

2. 每次修改文件保存后触发更新，浏览器会发起请求，请求两个文件，生成一个json和一个js文件：
   1. json文件：包含两个参数，h:下次请求的hash, c: 修改的模块
   2. js文件：修改的代码(如果没有做任何修改，则仅有json文件，没有js文件)



# webpack热更新步骤
1. 启动webpack, 进行代码的编译工作
2. 启动本地serve, 借助express框架，让浏览器可以请求本地的静态资源；
3. 借助websocket, 建立本地服务和浏览器的双向通信, 当本地文件发生变化，立马告知浏览器可以热更新代码;


# 参考文章

1. [](https://juejin.im/post/6844904008432222215)
2. [19-webpack中的热更新及原理分析](http://book.tangyefei.cn/play-webpack/_book/chapter2-19-webpack%E4%B8%AD%E7%9A%84%E7%83%AD%E6%9B%B4%E6%96%B0%E5%8F%8A%E5%8E%9F%E7%90%86%E5%88%86%E6%9E%90.html)