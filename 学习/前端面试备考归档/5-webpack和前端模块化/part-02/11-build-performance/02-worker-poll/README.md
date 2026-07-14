## work-pool

1. thread-loader 可以将非常消耗资源的 loader 分流诶一个worker pool
2. 该loader 替代了 happy-pack

> 不要使用太多的worker, 因为Node.js 的 runtime 和 loader 都有启动开销，最小化worker 和 main precess(主进程)之间的模块传输、进程间通讯(IPC, inter process communication)是非常消耗资源的。



## 实现

1. 安装 `npm i thread-loader -D`
2. 配置webpack.config.js

```js
const path = require("path");

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          },
          {
            loader: "thread-loader",
            options: {
              workers: 2
            }
          }
        ]
      },
    ]
  }
};

```

## 对比

使用loader: thread-loader 前后多次执行打包 耗时对比

| 前     | 后     |
|--------|--------|
| 640 ms | 790 ms |
| 646 ms | 799 ms |
| 660 ms | 868 ms |



> 注意，loader 本身的启动有时间开销，所以该loader更适用于耗时非常大的loader