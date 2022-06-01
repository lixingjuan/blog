# 性能webpack优化

## 性能分析

### 打包速度分析

#### 插件 `speed-measure-webpack-plugin`， 分析各部分耗时

使用方法

```js
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin({
  outputFormat: 'human'
});

const config = {
    // ...一堆配置
}

// 将导出的配置使用 plugin smp 进行包裹
module.exports = smp.wrap(config)
```


终端的输出

```ts
 SMP  ⏱
General output time took 59.15 secs

 SMP  ⏱  Plugins
CustomHtmlPlugin took 0.024 secs
DefinePlugin took 0.012 secs
PreloadPlugin took 0.011 secs

 SMP  ⏱  Loaders
mini-css-extract-plugin, and
css-loader, and
postcss-loader, and
sass-loader took 36.32 secs
  module count = 2
css-loader, and
postcss-loader, and
sass-loader took 36.27 secs
  module count = 4
mini-css-extract-plugin, and
css-loader, and
vue-loader, and
postcss-loader, and
sass-loader, and
cache-loader, and
vue-loader took 28.47 secs
```



### 打包体积分析

#### 官方提供的


1. 运行指令
`./node_modules/.bin/webpack --profile --json > stats.json`

2. 使用网站 [webpack官方-体积分析](http://webpack.github.io/analyse/#modules) 打开本地的 stats.json



#### webpack-bundle-analyzer




```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    // ...
    plugins: [
        new BundleAnalyzerPlugin()
        // ...
    ]
}
```


## 性能优化

### thread-loader： 开启多线程打包
放在所有loader 之前


### externals

1. webpack externals 属性，排除打包在内的三方库，然后在 `index.html` 中CDN引入



### 开启缓存cache相关

1. babel-loader


```js
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
      },
      {
        test: /\.(bmp|gif|jpe?g|png|svg)$/i,
        type: 'asset',
        generator: {
          filename: 'static/images/[hash][ext][query]',
        },
      },
    ],
  },
```


### DLL，优化打包速度和体积

1. webpack.DllReferencePlugin
2. AddAssetHtmlWebpackPlugin
3. webpack.DllPlugin
4. 举例
```js
/* 1. 新建 webpack.dll.config.js 文件 */
module.exports = {
  mode: 'development', // 环境
  entry: {
    vendors: ['lodash', 'moment'], // 将 lodash, moment 打包到 vendors.js 下
    react: ['react', 'react-dom'], // 将 react 和 react-dom 打包到 react.js 下
    antd: ['antd'], // 将 antd 打包到 antd.js 下
  },
  output: {
    filename: '[name].dll.js', // 输出的名字
    path: path.resolve(__dirname, 'dll'), // 输出的文件目录
    library: '[name]', // 将我们打包出来的文件以全部变量的形式暴露，可以在浏览器变量的名字进行访问
  },
  plugins: [
    // 对生成的库文件进行分析，生成库文件与业务文件的映射关系，将结果放在 mainfest.json 文件中
    new webpack.DllPlugin({
      name: '[name]', // 和上面的 library 输出的名字要相同
      path: path.join(__dirname, 'dll', '[name].manifest.json'),
    }),
  ],
};

/* 2. 在package.json添加脚本  */
{
    "scripts": {
       // ...
       "build:dll": "webpack --config webpack.dll.config.js",
       // ...
    },
}

/* 3. 运行指令, 生成dll 文件 */
yarn build:dll


/* 4. 在webpack.dev.config.js 配置引入和分析venders */
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

module.exports = {
    plugins: [
       new webpack.DllReferencePlugin({
         manifest: require(path.resolve(__dirname, './dll/venders.manifest.json'))
       }),
       new AddAssetHtmlWebpackPlugin({
         filepath: path.resolve(__dirname, '../dll/venders.dll.js')
       }),
        // ...
     ],
}

```


