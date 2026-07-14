
# useRef

useRef是React Hook之一，他可以在函数组件中存储一个可变的引用对象，这个引用对象在函数组件的整个生命周期内都保持不变。
useRef最常见的用途有两个：访问Dom结点和保存任何可变值。

## 访问DOM节点

在React中，通常使用受控组件来处理表单输入等，但有时直接访问DOM节点是必要的，比如管理焦点、文本选择或媒体播放。useRef允许我们直接访问DOM元素，而不用依赖于传统的DOM操作方法。


## 保存任何可变值

另一个useRef的用途是保存任何可变值。这个值可以是任何类型，比如一个数字、字符串、对象等。与实例属性在class组件中的作用相似，通过useRef创建的对象在组件的整个生命周期内保持不变，即使组件重新渲染。不同于状态（state），更新ref对象中的值不会触发组件的重新渲染。


# ref解决了什么问题？

1. 提供了操作原生Dom 的能力，eg.
   1. Input.focus()
   2. echarts渲染
2. 直接调用子组件方法的能力


## Ref有什么作用？

react会自动做转发：

- 作用于HTML元素： 将`原生dom`绑定在.current属性上
- 作用于`class`组件： 将`组件实例`绑定在.current属性上
- 作用于`函数`组件： 因为函数式组件没有实例，需要搭配`forwardRef`, 做转发，另外可以使用 `useImperativeHandle(ref, handle, deps)`, 将子组件的方法绑定到父组件上，使得父组件可以 `父组件.current.xxx()` 调用子组件绑定的方法


## 创建方式

1. class组件：
   1. React.createRef;
   2. 回调函数写法：`ref={element => this.textInput = element}`;
2. 函数式组件：`React.useRef()`;




## 其他用处

1. 因为 `ref` 在组件的整个生命周期内保持稳定引用地址的特性, 通常用它保存一些，在别的地方需要立即获取最新值的属性值；
2. 操作子组件的方法： 封装echarts库的时候，向组件暴漏当前实例/方法，便于发出action/event



## 有什么？

1. 回调写法，16.3.0版本开始支持
2. React.createRef: class组件
3. ✨useRef: hooks, 函数式组件





