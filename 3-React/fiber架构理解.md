# fiber架构

## 推出版本

v16


## 为什么提出fiber架构？

是为了解决CPU的瓶颈。

而在React16之前的架构设计，包括两层：
1. Reconciler
2. Renderer

在Stack Reconciler中，挂载和更新子组件，都会递归更新子组件，递归一旦开始，就无法停止，如果子组件过多，js执行时间就会过长，就会导致页面卡顿的效果。

而浏览器的渲染频率为60HZ, 也就是一帧16.6ms, 而在这16.6ms内，浏览器需要做三件事：

```
js执行 => 页面绘制 => 渲染
```

而浏览器中，GUI线程和js线程是互斥的，所以如果js的执行时间超过16.6ms的话，GUI线程就没有时间执行页面绘制和渲染，用户体验就会有明显的卡顿、掉帧。


## fiber架构目标

react在16提出了fiber架构，主要解决四个问题：

1. 事件执行可中断
2. 中断之后可以恢复工作；
3. 任务分配优先级；
4. 抛弃不必要执行的任务；




## fiber实现思路

Fiber把整个渲染更过程划分为多个小的任务单元，也就是fiber, 每个fiber都是一个执行单元.

React的fiber架构包含三层，分别是
- Scheduler：调度器；
- Reconciler： 协调器；由 Stack Reconciler 变成 Fiber Reconciler
- Renderer：渲染器；

### 事件可中断


每次fiber执行前都先判断是否应该继续执行，判断条件是:
1. 是否有更高优先级的fiber出现，如果有，则先执行该高优先级fiber, 完成后再回来执行当前fiber;
2. 当前帧是否剩余时间, 如果没有， 则中断执行，则将控制权交给主线程；
   1. 判断是否剩余执行时间，使用`requestAnimationFrame` 重新实现了requestIdleCallback，即Scheduler（调度器），未直接使用 `requestIdleCallback`, 是由于 浏览器兼容性；


React16 的新架构：
- Scheduler：调度器。
- Reconciler：协调器。由 Stack Reconciler 变成 Fiber Reconciler。
- Renderer：渲染器。




Api的实现上，浏览器已经实现了这一个 API，`requestIdleCallback`, 但是由于 浏览器兼容性， 所以react使用 `requestAnimationFrame` 重新实现了requestIdleCallback，即Scheduler（调度器）


### 事件可恢复

`利用链式结构实现事件可恢复的`

从编码的角度看，fiber是reat内部实现的一套数据结构，上面记录了非常多属性，其中有三个属性

```js
this.return = null;              // 指向父级fiber
this.child = null;               // 指向子级fiber
this.sibling = null;             // 右边第一个兄弟
```

- 这三个属性将一个个的fiber节点组成一个大的fiber tree, 可以根据一个节点找到所有关联节点，
- 当任务准备挂起时，通过一个全局变量记住当前 `任务节点`，
- 任务恢复的时候，通过这个全局变量来找到下一个要执行的任务，
- 就这样一直处理下去，直到没有要处理的节点返回。


### 优先级模型

#### expirationTime

react 通过算法，给所有的任务分配过期时间（expirationTime），也就是：

- `过期时间越短，优先级越高`
- 某个任务的过期时间比当前时间短，表示已经过期，需要立即执行（可能会发生中断）
- 随着时间推移，当前时间越接近过期时间，优先级变高


> 为什么不使用generator来控制任务的中断和执行?
> 因为generator有上下文依赖关系，无法插入高优先级任务；


react 17.0-rc优先级模型改为了lanes

#### lanes

`lanes` 解决`expirationTime` 模型导致的低优先级任务长时间等待的问题

对优先级进行了更细粒度的划分



### 抛弃不必要执行的任务

重新构建在内存中workInProgressFiberTree


## fiber更新dom过程

fiber架构 采用了双缓冲树架构

在react中同时有两颗fiber树：
- 当前屏幕上渲染的叫做`currentFiber`，
- 正在内存中构建的叫做`workInProgressFiber`

他们通过alternate属性连接

```js
currentFiber.alternate === workInProgressFiber;
workInProgressFiber.alternate === currentFiber;
```


当`workInProgress Fiber` 构建完成后交给 `Renderer` 渲染到屏幕后，应用根节点的`current指针`指向 `workInProgress Fiber`, 此时 `workInProgress Fiber` 就变成 `currentFiber`


每次状态更新都会产生新的workInProgress Fiber树，通过current与workInProgress的替换，完成DOM更新。