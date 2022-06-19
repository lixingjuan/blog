一篇很棒的文章

- [模块七日谈](http://huangxuan.me/js-module-7day/#/7)
- [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)


## ES6

ESModule
1. 静态编译，拷贝的是值的引用


## Common.js

同步加载

## UMD

UMD是AMD和CommonJS的糅合

1. AMD模块以浏览器第一的原则发展，异步加载模块。
2. CommonJS模块以服务器第一原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。

这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。

UMD先判断**是否支持Node.js的模块（exports）是否存在**，存在则使用Node.js模块模式。
在判断是否支持AMD（define是否存在），存在则使用AMD方式加载模块

## AMD

Async Module Definition(RequireJS 对模块定义的规范化产出)

1. 语法，require
2. 异步加载

## CMD

CMD: Common Module Definition(SeaJS 对模块定义的规范化产出, 玉伯)

1. 语法，define


