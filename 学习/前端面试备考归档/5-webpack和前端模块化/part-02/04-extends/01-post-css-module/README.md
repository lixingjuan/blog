
## PostCss

1. 是什么？为css属性值增加前缀以免浏览器无法识别
2. 需要安装 style-loader, css-loader, postcss-loader 三个loader
3. 需要安装插件 autoprefixer

./postcss.config.js
```js
module.exports = {
  plugins: [
    require("autoprefixer")
  ]
};

```
4. 需要配置浏览器支持版本，postcss 应用于browserlist指定的浏览器环境

package.json

```js
{
  // ...
 "browserslist": [
    "> 1%", // 全球浏览器的使用率大于1%
    "last 2 versions" // 最近两个版本
  ]
}
```





## CSS模块

1. 作用
   1. 生成css命名, 避免命名重复
   2. 实现css嵌套
2. 安装plugin, postcss-nested， 实现css嵌套

webpack.config.js 配置

```js
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
   // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ["style-loader", "css-loader", 'postcss-loader']
        // 实现css模块化
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              // !! 实现css模块化 为 css 类生成hash名
              modules: true
            }
          },
          'postcss-loader']
      }
    ]
  }
};

```

postcss.config.js 配置

```js
module.exports = {
  plugins: [
    require("autoprefixer"),
    require("postcss-nested"),
  ]
};
```




## 部分开启css模块

修改 module.rule 中的test 正则，自定义 谁使用

比如，定义 xx.global.css 的不适用模块