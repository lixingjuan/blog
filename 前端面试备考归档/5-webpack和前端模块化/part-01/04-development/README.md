1. 精准定义代码行数
   1. `mode: development`
   2. `devtool: "inline-source-map"`
2. 热编译: 运行 `npx webpack --watch`,
   1. webpack自带功能，使项目实时检测代码变化进行打包
3. 热更新: 运行命令 `npx webpack-dev-server`
   1. 利用 `webpack-dev-server`, 将打包后的文件写入内存
   2. `npx webpack-dev-server --open`, 可以热编译并打开浏览器（但是不晓得为啥我的老是打开finder）