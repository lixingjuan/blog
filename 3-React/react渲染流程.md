## react渲染流程

分为三个阶段
1. 调度 Scheduler
2. 调和 Reconciler
3. 提交
   1. before mutate
   2. mutate
   3. repaint



## Scheduler调度


**scheduler？**

决定什么时候执行工作的过程


一次更新：=》 React.ReactElement => 构建fiber => 真实DOM

自定义调度堆栈, 保存在内存中，实现函数执行的随时中止和继续，以此提供更流畅的执行性能








# Reconciliation调和


**什么是Reconciliation**

React 用来diff 两棵树的，从而确定哪些部分需要修改



**Diff的对比过程**

1. 对比不同类型的组件/元素：都会触发卸载/重新渲染
   1. 组件A-组件B
   2. 元素A-元素B
   3. 元素A-组件B
2. 对比同类型的元素：修改改变的属性
3. 对比同类型的组件元素：组件实例和state保持不变，触发更新的生命周期




**为什么key可以提升性能**

因为在diff子节点的时候，如果是在列表末尾增加子元素，比较简单，因为顺序没有改变，只需要依次匹配，然后增加新元素即可；

但是如果在列表头部增加子元素，react不会意识到老的元素应该保留，所以会重新创建所有子元素；

key的存在，就是为了帮助react在diff的过程中，识别老元素，从而减少不必要的重建，节省了diff的时间；





# render 阶段

# Commit阶段

在这个阶段执行生命周期、hook


在commit阶段运行的主要函数是 [commitRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L523)




## 相关文章

1. [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
2. [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
3. [The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)