## 常用的loader

css loader
sass loader
less loader
ts loader
json loader


## 常用的plugin

1. `HtmlWebpackPlugin`
   1. 打包时自动引入js文件
   2. 指定打包配置: 自定义模版html、 文件名、自动引入js、js加载的位置
2. `webpack.DefinePlugin`: 自定义环境变量;
3. `LodashModuleReplacementPlugin`: 打包的时候，剔除不需要的lodash函数
4. `DllReferencePlugin`
5. `ReactRefreshWebpackPlugin`
6. `ForkTsCheckWebpackPlugin`: 为ts check 开启单独进程


