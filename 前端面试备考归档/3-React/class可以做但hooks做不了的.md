# class 可以做但 hooks 做不了的

## 错误边界

class 组件可以通过 `comonentDidCatch`和 `static getDerivedStateFromError` 来实现错误边界。这使得 class 组件可以捕获子组件的错误并将其显示为一个备用 UI

## 组件卸载行为不一致

componentWillUnmount 仅在组件即将被卸载和销毁前调用一次

```jsx
useEffect(() => {
  return () => {
    // dependencies的每次改变都会导致组件渲染从而导致这里的函数执行
  };
}, [dependencies]);
```

## 获取派发更新的时间

在类组件中，可以使用 componentDidUpdate 获取上一个 props 或 state,这对于比较更新后的状态很有用

## 复杂的状态逻辑

class 组件中，setState 可以一次更新多个状态值
