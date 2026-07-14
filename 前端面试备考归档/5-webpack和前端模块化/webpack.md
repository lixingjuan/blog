# webpack 是什么？

webpack 本身是一个非常强大的 javascript 模块打包工具，功能如下：

## 模块打包

webpack 本身仅支持打包 js 代码，但是借助 webpack-loader, webpack 能够加载各种类型的文件转换为 js 文件并加入依赖图中，如 CSS、图片、字体文件等

## Loaders（加载器）

webpack 本身并不理解除了 js 以外的文件，借助 webpack loader, 可以将所有类型的文件转为 js, 例如

- css-loader: 处理 css 文件，将其转为 css；
- sass-loader: 将 sass 语法编译为 css
- file-loader: 处理图片和字体，将他们输出到构建目录；
- csv-loader 或 xml-loader: 可以将 csv 或 xml 文件转为 js 对象；
- babel-loader: 使用 babel 转换 js 代码，使之能在旧版浏览器中运行；

loader 在调用上是链式的，一个 loader 处理后，会把处理完成的文件交给下一个 loader 继续处理

## Plugins（插件系统）

插件允许开发者控制 webpack 构建过程的每一个阶段。这使得开发者可以添加自定义功能到构建过程中，例如：

- `HtmlWebpackPlugin`: 自动将输出的 js 绑定到 HTML 文件
- `MiniCssExtractPlugin`: 提取 css 到单独的文件
- `CleanWebpackPlugin`: 构建前清理构建文件夹
- `LodashModuleReplacementPlugin`: 剔除未使用的 lodash 方法
- `ForkTsCheckWebpackPlugin`:

## 代码拆分（Code spliting）

webpack 支持代码拆分和懒加载功能，这有助于将代码拆分为不同的块，然后按需加载，从而提供应用的加载速度和性能。可以通过配置入口点或者使用 import()语句来实现代码拆分

## 性能优化

webpack 提供了许多优化功能：

- tree shaking: 移除未使用的 js 代码
- 代码压缩：利用插件例如 `TerserWebpackPlugin` 压缩输出的 JS 代码
- 环境标志优化：利用 DefinePlugin 定义环境变量，可以区分代码做不同的事情，例如：生产环境不展示调试工具、生产环境隐藏提示

## 中间件

webpack 提供了一些中间件支持，例如 `webpack-dev-server` 和 `webpack-hot-middleware`, 这两个中间件，支持热模块替换（HMR）可以即时重载修改过的模块，无需刷新整个页面。

## Source Map

支持代码，便于问题定位
