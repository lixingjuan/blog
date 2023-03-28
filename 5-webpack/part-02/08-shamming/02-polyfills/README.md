## 完全引入polyfills

> 生产环境打包后main.js体积 => 87.6 KiB


不推荐，可能仅使用了一个方法，却导入了整个polyfill, 导致包体积大

1. 安装 `npm install @babel/polyfill -D`
2. 在文件开头引入 `import "@babel/polyfill"`




## 优化polyfills引入方案

> 生产环境打包后main.js体积 => 19.1 KiB

1. 安装 `npm i babel-loader @babel/core @babel/preset-env core-js@2 -D`
2. 配置webpack.config.js
```js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  /* !! 这部分也可以定义在package.json 中 */
                  targets: [
                    'last 1 versions',
                    '> 1%'
                  ],
                  useBuiltIns: 'usage',
                  corejs: 3
                }
              ]
            ]
          }
        }
      }
    ]
  }
};

```
