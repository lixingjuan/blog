## loader：文件编译器

Loader 主要用于**转换特定类型的模块**，它们作为一个转换过程，能将文件从不同的语言（如 TypeScript 转为 JavaScript）、将新的语法（如 ES6 转为 ES5）、或者将样式从一种格式（如 Sass 转为 CSS）转换到另一种可以被浏览器解析的格式。

举例来说，`babel-loader`可以将 ES6 代码转换为 ES5 代码，而 `sass-loader`则是用来将 Sass 文件编译成 CSS 文件。

执行顺序方面，Loader 的确是从下到上或从右到左的方式链式调用，

## plugin：扩展器

扩展 Webpack 功能的广泛机制，它们直接作用于整个构建流程，可以执行范围更广的任务，比如打包优化、资源管理和环境变量注入等。

例如，`HtmlWebpackPlugin`可以生成一个 HTML 文件，并自动将打包后的 JS 文件引入其中，而 `CleanWebpackPlugin`会在每次构建前清理/build 文件夹，确保构建产出的文件只有最新的。

而 Plugin 的执行则依赖于 Webpack 的钩子机制，它们可以在编译的不同阶段执行特定的任务。
