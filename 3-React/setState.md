## stateState 发生了什么？

1. 触发setState
2. 计算expirationTime
3. 更新调度，调和fiber树
4. 合并state, 执行更新
6. 替换真实dom;
7. class, 调用回调函数;



## 如何获取最新state

1. class组件，this.setState, 有第二个参数 callback 或者是生命周期componentDidUpdate 可以检测监听到 state 改变或是组件更新
2. 函数式组件，通过useEffect监听


## 为什么无法获取最新state

函数组件更新就是函数的执行，在函数一次执行过程中，函数内部所有变量重新声明，所有改变的 state ，只有在下一次函数组件执行时才会被更新。同一个函数执行上下文中拿不到最新的 state 。


## 为什么不直接修改state,  而是提供setState方法

- react会存储一份state, 用来和新的state进行对比从而判断是否更新；
- 如果直接修改，React无法监听值的改变，判断是否要更新dom