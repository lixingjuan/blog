一篇很棒的文章

- [模块七日谈](http://huangxuan.me/js-module-7day/#/7)
- [前端模块化开发那点历史](https://github.com/seajs/seajs/issues/588)


| ESModule | Common.js | UMD                  | AMD | CMD |
|----------|-----------|----------------------|-----|-----|
| 静态编译 | 同步加载  | 现判断node.js, 再AMD |     |     |
| 值的引用 | 值的拷贝  |                      |     |     |


## ESModule

1. 静态编译;
2. 拷贝的是值的引用;


## Common.js

1. 同步加载（因为是服务端，所以动态加载不怕速度慢）;
2. 值的拷贝








## UMD

UMD（Universal Module Definition）是AMD和CommonJS的糅合

1. `先判断`是否支持 `Commom.js`;
2. `再判断`是否支持 `AMD`


1. AMD模块以`浏览器第一`的原则发展，异步加载模块。
2. CommonJS模块以`服务器第一`原则发展，选择同步加载，它的模块无需包装(unwrapped modules)。








## CMD

CMD: Common Module Definition(SeaJS 对模块定义的规范化产出, 玉伯)

1. 语法，define
2. CMD推崇依赖就近、延迟执行；(此规范产生于sea.js推广过程中)


