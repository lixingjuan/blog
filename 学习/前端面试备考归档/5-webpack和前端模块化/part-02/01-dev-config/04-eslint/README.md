## 安装eslint


1. 安装eslint, `npm i eslint -D`
2. 对项目进行初始化, `eslint --init`
3. 对src下进行eslint校验, `npx eslint src`



## 将eslint 和 webpack 结合起来

1. 安装 `babel-loader eslint-webpack-plugin`
2. 如下配置

```js
const EslintWebpackPlugin = require('eslint-webpack-plugin');


{
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        /**
         *  !! 之前
         *  先用eslint-loader 做检查
         *  再用babel-loader 编译
         *  !! 现在
         *  eslint-loader 已弃用，改用 eslint-webpack-plugin
         */
        use: ['babel-loader', /* 'eslint-loader' */],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/app.html',
    }),

    new EslintWebpackPlugin(),
  ],
}
```


## vscode 配置

```js
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[javascript]": {
    "editor.formatOnSave": false,
    "editor.quickSuggestions": true // 打开markdown文件的智能感知提示，解决markdown文件代码片段不生效问题
  }
}

```