1. 简单介绍下react 的 fiber 算法？

之前的更新都是一直从父组件往下查找到嵌套最深的组件
该过程不可中断

fiber算法就是为了解决这个问题
将事件做最小切片，进行调度


fiber算法的调度过程中， 有两个过程
reconcilition 和commit 两种过程
reconcilition过程可以随时中断，所以该过程可能会触发多次，产生bug,所以尽量不要在该过程的生命周期做什么操作，该过程的生命周期有
- componentWillMount
- componentWillReceiveProps
- shouldComponentUpdate
- componentWillUpdate

commit过程不可中断，该过程的生命周期有
- componentDidMount
- componentDidUpdate
- componentWillUnmount



并且 React16 中也引入了新的 API 来解决 reconcilition 过程中生命周期调用多次的情况

于是官方推出了getDerivedStateFromProps，让你在render设置新state，你主要返回一个新对象，它就主动帮你setState。由于这是一个静态方法，你不能取到 this，当然你也不能操作instance，这就阻止了你多次操作setState。这样一来，getDerivedStateFromProps的逻辑应该会很简单，这样就不会出错，不会出错，就不会打断DFS过程。