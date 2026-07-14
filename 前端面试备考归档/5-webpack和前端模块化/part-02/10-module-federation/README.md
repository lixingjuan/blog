## 利用 module-federation 实现微服务

生产者配置 webpack.config.js

```js
const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'nav',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        "./Header": "./src/Header.js"
      },
      // 三方共享模块
      shared: {}
    })
  ],
};

```


消费者配置 webpack.config.js

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
  // ...
  plugins: [
    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      remotes: {
        nav: "nav@http://localhost:3002/remoteEntry.js"
      },
      exposes: {
        "./HomeList": "./src/HomeList.js"
      },
      // 三方共享模块
      shared: {}
    })
  ],
};

```
