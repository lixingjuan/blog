# class和hooks对比


1. 底层实现：class组件渲染的时候，会创建一个组件实例；函数式组件是纯函数，组件渲染是一次函数调用；
2. 组件声明方式的语义差别：class组件通过声明类来定义，暗示了面向对象编程的特性：封装、继承；而函数式组件的声明方式更接近于函数式编程，强调无副作用、不修改状态、输入输出的确定性等。
3. 状态管理：class采用this.state和this.setState, 函数式组件采用hooks中的useState进行状态管理；
4. 性能优化：class组件的shouldComponentUpdate和React.PureComponent; 函数式组件的React.memo和React.useMemo;
5. 逻辑复用：class组件采用高阶组件；函数式组件采用自定义hooks;
6. Ref使用差异：class中使用`React.createRef`创建，然后将返回值附加到React元素上，可以获取原生DOM和组件实例；函数式组件通过useRef创建, 除了用于获取原生DOM外，还通常会使用useRef.current任何可变值，而这个值的改变不会触发组件的重新渲染。另外再函数式组件中，useRef还可以搭配 React.forwardRef 和 useImperativeHandle, 向父组件暴露子组件内部的属性和方法




