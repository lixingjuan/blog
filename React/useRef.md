## Is...?

react会帮忙做转发，
- 作用于HTML元素：将**底层dom**绑定在.current属性上
- 作用于（class）组件：将**组件实例**绑定在.current属性上
- 作用于（函数）组件：需要搭配`forwardRef`, 做转发，另外可以使用 `useImperativeHandle`, 将子组件的方法绑定到父组件上，使得父组件可以 `父组件.current.xxx()` 调用子组件绑定的方法


## Have...?

1. 回调写法，16.3.0版本开始支持
2. React.createRef: class组件
3. ✨useRef: hooks, 函数式组件


## Solve what?

1. 提供了操作底层Dom 的能力，eg.
   1. Input.focus、
   2. 强制Dom执行动画
   3. 集成第三方 DOM 库



## 用处

1. 因为 `ref` 在组件的整个生命周期内保持稳定引用地址的特性, 通常用它保存一些，在别的地方需要立即获取最新值的属性值
2. 操作子组件的方法
   1. is useful for third-party DOM libraries to expose their API to the parent component
   2. 封装echarts库的时候，向组件暴漏当前实例/方法，便于发出action/event