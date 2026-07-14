## 生成文件名称

利用可替换字符串变量，为生成文件加上 hash 值，避免浏览器缓存导致文件不更新

```js
{
   // ...
   output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    assetModuleFilename: "images/[contenthash][ext]",
  },
}
```


## 将node_modules 中的文件都打包到一个文件中
利用浏览器长效缓存机制将三方库文件缓存避免重复加载

```js
{
   // ...
   optimization: {

      // ...
      splitChunks: {
         // 将node_modules 中的文件都打包到一个文件中
         cacheGroups: {
            vendor: {
               test: /[\\/]node_modules[\\/]/,
               name: "vendors",
               chunks: "all",
            },
         },
      },
   },
}
```

