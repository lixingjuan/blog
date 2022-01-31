## 什么是loader?

loader 可以让webpack 去处理其他类型的文件，并且将他们转化为有效的模块来供我们的应用程序使用


## 加载css

我们学习了
1. 通过style-loader, css-loader 让webpack 去加载css资源
2. 并且将css代码放在html页面的head里面(!!style-loader 实现)
3. 同时还可以使用less-loader, sass-loader, stylus-loader 来引入css预处理工具



4.

```js
{
  module: {
    rules: [
      // ...
      {
        test: /\.css$/,
        /**
         * 1. 此处支持字符串/数组
         * 2. 顺序从后向前
         * 3. 先使用css-loader使得打包没有问题，可识别css文件
         *    再使用style-loader将css放置页面上
         */
        /**
         * !!loader支持链式调用，且逆序，最后一个loader先对源进行转换，将转换的结果传给他的前一个loader
        */
        use: ["style-loader", "css-loader", "less-loader"],
      },
    ],
  },
}
```


## 抽离和压缩css

1. 利用 `mini-css-extract-plugin` 及其 对应的loader 去抽离css文件
2. 利用 `css-minimizer-webpack-plugin` 压缩css文件
   1. !! 注意，他是使用在 `{   optimization: { minimizer: [ // 在此处实例化 ] } }`
   2. !! 还需要修改mode值为 production


## 加载 images 图像

1. css中加载图片资源
   1. 直接支持
2. 通过05课的 `asset-module` 加载


## 加载 fonts 字体

1. module 引入规则

```js
{
  // ...
  module: {
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      type: "asset/resource",
    },
  }
}
```
2. 在css中引入字体文件并定义


## 加载数据

1. 利用 `csv-loader` 和 `xml-loader` 来加载 csv, tsv, 或者是 xml文件


## 自定义 json 模块 parser

1. 利用 loader `yaml, taml, json5` 去加载 yaml, toml, 以及json5