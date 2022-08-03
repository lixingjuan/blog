一篇很棒的文章

- [模块七日谈](http://huangxuan.me/js-module-7day/#/7)
- [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)


| ESModule | Common.js | UMD                  | AMD | CMD |
|----------|-----------|----------------------|-----|-----|
| 静态编译 | 同步加载  | 现判断node.js, 再AMD |     |     |
| 值的引用 | 同步加载  |                      |     |     |

## ESModule


1. 静态编译，拷贝的是值的引用


## Common.js

1. 同步加载（因为是服务端，所以动态加载不怕速度慢）


## AMD

Async Module Definition (RequireJS 对模块定义的规范化产出)

1. 语法，required.config()指定路径、defined()定义模块、required()加载模块
2. 异步加载
3. AMD(required.js)推崇**前置**、提前执行；


## UMD

UMD是AMD和CommonJS的糅合

1. AMD模块以**浏览器第一**的原则发展，异步加载模块。
2. CommonJS模块以**服务器第一**原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。

这迫使人们又想出另一个更通用的模式UMD （Universal Module Definition）。希望解决跨平台的解决方案。

UMD**先判断**是否支持**Node.js**的模块（exports）是否存在，存在则使用Node.js模块模式。
**再判断**是否支持AMD（define是否存在），存在则使用AMD方式加载模块



## CMD

CMD: Common Module Definition(SeaJS 对模块定义的规范化产出, 玉伯)

1. 语法，define
2. CMD推崇依赖就近、延迟执行；(此规范产生于sea.js推广过程中)


