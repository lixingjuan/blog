# 对别

| 项目 | vue            | react |
|------|----------------|-------|
|      | 虚拟DOM，VNode |       |

1. 监听数据变化的实现原理

vue 通过getter / setter 以及 一些函数的劫持(??)，能精确知道数据变化，不需要特别的优化就能达到很好的性能；
react默认通过比较引用的方式进行的，如果不油滑（PureComponent/shouldComponentUpdate）可能导致大量不必要的VDOM的重新渲染；

为什么React不精确监听数据变化呢？ 
这是因为Vue和React 设计理念上的区别， Vue使用的可变数据，而react 更强调数据的不可变；
所以Vue更简单，而react构建大型项目更棒？？？ （没明白，并没有说明白棒在哪里？）



2. 数据流向不同

vue:
parent --> child <--> DOM
                v-model

react:
parent --> child --> DOM
                state

react从诞生就不支持双向数据绑定，一直提倡单向数据流，他称之为 onChange/setState() 模式

