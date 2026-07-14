## 为什么需要babel-loader

1. 虽然webpack 天生支持加载js文件，但是他只能做js模块化的打包，并不能转化js里的代码，比如将ES6转化为ES5，那有时候我们的ES6/7/8等新版本语法可以正常运行，纯靠浏览器来解析，如果遇到低版本的浏览器，运行就可能发生错误。
因此我们在写高版本语法的js是需要转化的，这个转化的工具就是babel
2. babel 和webpack结合就需要一个babel-loader


## 使用babel-loader

我们通过安装 `babel-loader` `@babel/core` `@babel/preset-env` 在配置文件里让webpack来解析js文件的时候，去用babel-loader 来对js转化一下


## regeneratorRuntime 插件

例如，async/await语法转化为ES5的时候，是需要 regeneratorRuntime 插件的支持，所以我们通过安装另外两个插件来实现
1. @babel/runtime: 包含全局 `regeneratorRuntime` 辅助函数
2. @babel/plugin-transform-runtime: 该插件会在需要 `regeneratorRuntime` 函数的地方**自动require导包**