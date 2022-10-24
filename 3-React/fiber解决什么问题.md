
# Fiber架构

## 为什么提出fiber?

- 计算机**跟踪程序执行**的方式是调用堆栈，当一个函数被调用的时候，就会被加入到这个调用栈中。
- 在处理UI的时候，如果一次执行太多的工作，就会让动画丢失帧导致看起来不稳定；
- 更重要的是，一些更新可能已经不必要的了，他可能已经被更新的更新取代了。
- 所以react想要自己实现一个**虚拟调用堆栈**，掌控对事件执行的调度
  - 使用 requestAnimationFrame 模拟了 requestIdleCallback,
  - （1s-60帧，requestIdleCallback只有20帧），


## fiber目标

使用fiber的主要目标是使react能更好的利用scheduler的优势，具体来说

1. 暂停工作，稍后回来
2. 给不同的工作分配优先级
3. 如果不再需要就放弃当前work

为了实现这些目标，需要把任务拆分成单元，也就是fiber



## fiber更新过程


1. 初次渲染会创建一棵 Fiber 树，用来反映页面UI呈现，叫作current tree
2. 更新的时候会创建另一棵 Fiber 树，叫做 workInProgress tree, （草稿的概念）所有的修改都是发生在 workInProgress 树上



## fiber的数据结构

链式