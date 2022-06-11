分为三个阶段
1. 调度 Scheduler
2. 调和 Reconciler
3. 提交
   1. before mutate
   2. mutate
   3. repaint



## 1. scheduler

使用requestAnimationFrame 模拟了 requestIdleCallback, （1s-60帧，requestIdleCallback只有20帧），

一次更新：=》 React.ReactElement => 构建fiber => 真实DOM

## 2. Reconciler


两件事

1. diff
2. 辅助diff, 根据虚拟DOM创建对应的fiber链

fiber解决了什么问题？
1. 时间耗时长，阻塞用户操作
2. 当react-render, 辅助diff两棵树的差异，从而高效的更新


fiber的更新

1. 创建一个rootFiber
2. 会进入 beginwork 流程，向下调和的过程
   1. workInProgress是：正在内存中构建的 Fiber 树称为 workInProgress Fiber 树。在一次更新中，所有的更新都是发生在 workInProgress 树上。在一次更新之后，修改指针指向，workInProgress 树上的状态是最新的状态，那么它将变成 current 树用于渲染视图。
   2. current：正在视图层渲染的树叫做 current 树


## 3. 提交

执行生命周期、hook