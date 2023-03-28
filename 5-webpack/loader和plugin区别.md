## loader

文件编译器

1. 本质上是导出为函数的JavaScript模块, loader runner 会调用这个函数，然后将上一个函数的结果进行转换
2. loader的作用是把`源码`转换成`目标编码`
3. 执行顺序是从右到左，从下到上



## plugin

是一个扩展器，增强了webpack 本身，针对的是loader结束之后webpack打包的整个过程