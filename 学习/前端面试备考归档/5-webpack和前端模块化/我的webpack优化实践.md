## 开发环境编译速度优化

1. 增加 `reach-refresh`: 提升开发体验，不需要全局刷新; 编译速度也有提升；
2. 使用 webpackplugin `speed-measure-webpack-plugin`, 测速发现 dev 模式下，移 `LodashModuleReplacementPlugin`，耗时过长，而他的作用是删除不需要的方法从而减小打包提示，所以是比较适合生产环境， 所以把它移动到了到 prod.js
3. `dll预编译`：将 devDenpences 中所有依赖均使用 dll 进行打包；
4. `手工升级`，项目中之前有一个老的卡片的写法，处理方式是，将一个大的对象注册到 window 上，发现这边注释掉后，编译速度会一下到 200-300ms, 所以这边是手工一个个改为组件的用法(背景：项目中原来就有计划，废弃卡片的写法，目前还有 10 几张，共 50 多个)；

编译速度提升 6000-8000ms => 2000-3000ms

## 包体积优化

1. 利用 import 的魔法注释，增加打包的可读性，并且通过阅读代码，抽离包公用部分
2. 并存的不同版本的 highcharts，作为技术任务，优先将使用 react-highcharts 的部分，改为 echarts 的写法，（背景：由于版权问题，项目中已经在逐渐将 high-charts 改写为 echarts）
3. TODO: 代码拆分，配置多个入口点，影响了 LCP

## dead-code 清理

1. 分析工具:
   1. `webpack-deadcode-plugin`, 检测未使用的文件和文件夹
   2. `ts-prune`, 检测范围是`tsconfig.json`中`include`字段指定的文件
2. 代码行数统计工具: `vscode-code-line`插件
