## stateState 发生了什么？

1. 触发setState
2. 计算expirationTime
3. 更新调度，调和fiber树
4. 合并state, 执行更新
6. 替换真实dom;
7. class, 调用回调函数;

## setState永远是异步的么


在react中，setState的更新通常被认为是异步的，这是因为react可能会批量更新或延迟执行状态更新以优化性能。然而实际上，setState的异步不是绝对的，这取决于他被调用的上下文。

1. 批处理更新
react为了优化性能，通常会进行批处理更新。所以如果你在react的生命周期或者时间处理函数中调用呢，react会将多次setState合并为一个更新操作来执行，这意味着在这些场景中，setState的更新是异步的，react会延迟状态更新直到事件完成。
2. 立即执行更新
当setState在异步函数中调用，比如setTimeout、Promise.then、原生事件处理中，他不会被批量更新，而是会立即执行。在这些情况下，setState更像是同步的。


## 为什么立即取不到最新值？

即使setState会被立即调用，react也不会立即更新组件。setState只是触发了一个更新过程，实际的组件更新和状态渲染会在稍后进行。这就是为什么立即去获取到最新值。

更新延迟：react组件需要计算组件及其子组件的差异，并更新DOM。这个过程需要时间，所以新的状态值不会立即反映出来。


## 如何获取最新state

1. class组件: this.setState, 有第二个参数 callback 或者是生命周期componentDidUpdate 可以检测监听到 state 改变或是组件更新
2. 函数式组件: 通过useEffect监听


## 为什么不直接修改state,  而是提供setState方法

- react会存储一份state, 用来和新的state进行对比从而判断是否更新；
- 如果直接修改，React无法监听值的改变，判断是否要更新dom