## tree-shaking

1. 基于esmodule
2. 没有使用的函数不会被打包
3. 默认很智能，css文件虽然只import未使用，不会被摇掉

## sideEffects

配置在 package.json中


值有
1. true, 所有文件都有副作用，不要tree-shaking
2. false, 所有文件都没有副作用，都可以被tree-shaking
3. 数组，有副作用的文件