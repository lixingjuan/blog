## 通用环境提升构建性能

![](images/README-22-02-02-20-59-19.png)

Dll 是微软的一个动态链接技术
时间和体积对比

|      | dll前            | dll后             | add asset 后                              |
|------|------------------|-------------------|-------------------------------------------|
| 时间 | 2728 ms          | 655 ms            | in 1956 ms                                |
| 体积 | main.js 88.3 KiB | main.js 608 bytes | main.js 608 bytes <br> jquery.js 88.1 KiB |


## Dll配置过程

1. 创建并配置文件 webpack.dll.config.js

```js
const path = require('path');
const webpack = require('webpack');


module.exports = {
  mode: "production",
  entry: {
    jquery: ["jquery"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dll"),
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_[hash]',
      path: path.resolve(__dirname, "dll/manifest.json"),


    })
  ]
}
```

2. 安装插件add-asset-html-webpack-plugin
3. 配置 webpack.config.js

```js
const path = require("path");
const webpack = require("webpack")
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  // ...
  plugins: [
    // ...
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, './dll/manifest.json')
    }),

    new AddAssetHtmlWebpackPlugin({
      filepath: path.join(__dirname, './dll/jquery.js'),
      publicPath: './'
    })
  ],
};

```