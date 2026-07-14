## react渲染流程

分为三个阶段
1. 调度 Scheduler
2. 调和 Reconciler
3. 提交
   1. before mutate
   2. mutate
   3. repaint






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








# render 阶段

# Commit阶段

在这个阶段执行生命周期、hook


在commit阶段运行的主要函数是 [commitRoot](https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/react-reconciler/src/ReactFiberScheduler.js#L523)




## 相关文章

1. [React Fiber Architecture](https://github.com/acdlite/react-fiber-architecture)
2. [Inside Fiber: in-depth overview of the new reconciliation algorithm in React](https://indepth.dev/posts/1008/inside-fiber-in-depth-overview-of-the-new-reconciliation-algorithm-in-react)
3. [The how and why on React’s usage of linked list in Fiber to walk the component’s tree](https://medium.com/react-in-depth/the-how-and-why-on-reacts-usage-of-linked-list-in-fiber-67f1014d0eb7)