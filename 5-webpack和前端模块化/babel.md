# babel

babel 是一个 javascript 编译器，可以将我们的代码编译为指定支持的浏览器版本，这样我们就可以尽情使用最新的语法提案（这也回答了另一个问题：如何处理浏览器兼容问题，but, 如何处理 CSS 兼容问题呢）

## babel 主要功能

- 语法转换:
- polyfill 功能: 也就是把一些不支持的 api,提供后备方案，注意 babel 中已经弃用了 `@babel/polyfill`, 改为使用更现代的 core.js 和 `regenerator-runtime`；
- 插件和预设: babel 的功能可以通过插件来扩展。babel 插件可以应用于语法转换、添加新功能或者修改编译过程。预设`presets`是一组插件的合集，我们常用的`@babel/preset-env`可以自动根据环境选择合适的 babel 插件；
- source Map: 源代码映射

## 常用的 babel-preset

1. `@babel/preset-react`: 如果编写 react 代码需要，将 jsx 语法转为 js
2. `@babel/preset-typescript`: 支持使用 typescript
3. `@babel/preset-env`: 支持配置的目标环境，自动编译 javascript 代码

## 常用的 plugin

1. `@babel/plugin-transform-react-jsx`: 自动从 react 的 package 中引入 jsx 函数，使得用户不需要在每个代码文件中编写`import React from 'react'`
2. `@babel/plugin-proposal-class-properties`: 支持类属性的提案语法
3. `@babel/plugin-syntax-dynamic-import`: 支持使用 import()动态引入模块
