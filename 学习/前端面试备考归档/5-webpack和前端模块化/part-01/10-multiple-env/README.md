## public

为打包后的文件引入指定base路径

```js
module.exports = {
  // ...

  output: {
    // ...
    /* !! 为打包后的文件引入指定base路径 */
    publicPath: "http://localhost:8080",
  },
}
```



## 环境变量

1. 跟在 --env 后面的就是环境变量
执行命令 `npx webpack --env test`

config.js文件入参打印

```js
{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, test: true }
```

1. 也可以是key=value的格式
执行命令 `npx webpack --env `

config.js文件入参打印

```js
{ WEBPACK_BUNDLE: true, WEBPACK_BUILD: true, test: 'hello' }
```


## 代码压缩工具terser-webpack

1. 是webpack自带的，mode 为 production 时自动压缩
2. 但是由于配置了 optimization.minimizer, 需要自己安装配置才能再次生效



## 拆分webpack配置文件

具体代码见 "./config" 下文件配置

## 配置npm脚本

./package.json 文件

```js
{
 "scripts": {
    "start": "webpack serve -c ./config/webpack.config.js --env development",
    "build": "webpack -c ./config/webpack.config.js --env production",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
}
```


## 提取公共配置文件

## 合并配置文件

利用插件 `webpack-merge`