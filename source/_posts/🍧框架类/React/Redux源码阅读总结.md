## 初步理解
1. redux: 是javascript应用程序的可预测容器
2. react-redux: 用来连接这个状态容器和react组件的

## dva 的connect的源码
- 我看例子上的使用方法是，括号1:参数1看起来就是返回了一个对象 `{products:...}`, 括号2的参数和re
```javascript
export default connect(({ products }) => ({ products }))(Products);

```

```javascript
/**
 * Connects a React component to Dva.
 */
export function connect(
  mapStateToProps?: Function,
  mapDispatchToProps?: Function,
  mergeProps?: Function,
  options?: Object
): Function;
```

