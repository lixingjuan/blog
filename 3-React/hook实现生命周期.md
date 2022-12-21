# mounting阶段

## constructor

该声明可以做两件事
1. state的初始化
2. 为事件处理函数绑定实例

在函数式组件不存在这个问题，所以只需要实现第一个功能

`useState()`的参数可以支持 值或者函数


## static getDerivedStateFromProps

static getDerivedStateFromProps(props, state), 它应该返回一个对象来更新状态，或者null什么都不更新


由于`new Props`、`setState`、`forceUpdate`都会触发该生命周期，
可以使用useEffect监听 props 和 state 的变化，决定是否要setState更新state值



## render

函数组件本身


## componentDidMount

`useLayoutEffect`, 数组为空


# updating阶段


## static getDerivedStateFromProps
见⬆️


## shouldComponentUpdate(nextProps, nextState)

返回false, 拒绝此次更新
可以使用高阶组件React.memo

```jsx
function MyComponent(props) {
  /* 使用 props 渲染 */
}
function areEqual(prevProps, nextProps) {
  /*
  如果把 nextProps 传入 render 方法的返回结果与
  将 prevProps 传入 render 方法的返回结果一致则返回 true，
  否则返回 false
  */
}
export default React.memo(MyComponent, areEqual);
```

注意，和shouldComponentUpdate返回值相反


## getSnapshotBeforeUpdate(prevProps, prevState)

getSnapshotBeforeUpdate(prevProps, prevState), 返回值会作为componentDidUpdate的第三个参数

无法实现--


getSnapshotBeforeUpdate() 在最近一次渲染输出（提交到 DOM 节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()。

```jsx

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }
```
## render
## componentDidUpdate

`useLayoutEffect`


可以使用ref.current来记录一个变量，判断是否是首次，首次的话不执行




## unmounting阶段

## componentWillUnmount

useLayoutEffect 的return中执行


