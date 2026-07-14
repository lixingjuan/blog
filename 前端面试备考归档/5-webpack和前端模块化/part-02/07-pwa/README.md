## http-server

基于node.js, 可以帮助启动一个静态服务

使用
1. 安装 `npm i http-server -D`
2. 启动dist文件, `npx http-server dist`


## 每次修改都将打包文件写入 dist文件夹

webpack.config.js

```js
module.exports = {
  // ...
  devServer: {
    devMiddleware: {
      /* !! 每次热编译都写入硬盘, 默认是写入告诉缓存中的 */
      writeToDisk: true,
    }
  },
};

```


## pwa

渐进式网络应用程序(Progressive Web Apps), 可以在浏览器端提供类似于原生APP体验, pwa可以做的事很多，其中最重要就是在离线环境下应用程序可以继续运行，这一实现利用的是Service-Worker



## 添加workbox来支持pwa



1. 安装 `npm i workbox-webpack-plugin -D`
2. webpack.config.js

```js
{
  plugins: [
    // ...
    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ],
}

```


## 注册ServiceWorker

```js
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
      console.log(' SW 注册成功', registration );
      })
      .catch(err => {
      console.log(' SW 注册失败',err);
    })
  })
}
```


## 清除SW的注册

1. 浏览器访问：chrome://serviceworker-internals/
2. 点击：unregister
