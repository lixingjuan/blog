## 全局shamming 实现全局变量

webpack.config.js

```js
const webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    new webpack.ProvidePlugin({
      _: "lodash"
    })
  ],
};

```


## 细粒度shamming 局部文件变量

1. 安装 `npm install imports-loader -D`
2. webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: require.resolve("./src/part-shamming.js"),
        use: 'imports-loader?wrapper=window'
      }
    ]
  }
};

```

这样，在文件part-shamming中，访问this, 即为window



## 全局Exports

实际开发应用：为不清楚导出情况的文件定义导出

1. 安装 `npm install exports-loader -D`
2. webpack.config.js

```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: require.resolve("./src/global.js"),
        use: 'exports-loader?type=commonjs&exports=file,multiple|helpers.parse|parse'
      },
    ]
  }
};

```


