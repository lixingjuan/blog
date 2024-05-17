## bundle-analyzer


`npm install webpack-bundle-analyzer -D`


webpack.config.js

```js
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

{
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```



## 一些bundle分析工具

1. webpack-chart: webpack stats 可以交互拼图
2. webpack-bundle-analyzer: 一个plugin 和cli工具，
3. webpack bundle optimize helpers: 分析bundle, 并提供可操作的改进措施，以减少bundle的大小
4. bundle-stats: 生成报告
5. ??webpack-visualizer-plugin: 可视化分析bundle, 检查哪些模块占用空间，哪些可能是重复使用的