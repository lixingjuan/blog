## webpack 模块

webpack 原生支持的模块

![webpack-module](/part-02/02-modules-dependence/01-resolver/images/webpack-module.jpeg)

通过loader加载的模块

![webpack-module](/part-02/02-modules-dependence/01-resolver/images/loader-module.jpeg)


webpack模块解析过程

![webpack-module](/part-02/02-modules-dependence/01-resolver/images/webpack模块解析过程.jpeg)





## 配置路径别名 & 文件后缀


```js
{
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },

    extensions: [".js", ".json"]
  },
}
```