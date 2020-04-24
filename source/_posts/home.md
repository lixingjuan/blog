---
title: 'Home'
comments: false
---

<script async defer src="https://buttons.github.io/buttons.js"></script>

# Hello

🍉，这里是李幸娟博客的首页！！！:)

## TodoList

❤️ 最重要


- [ ] 对比：类的继承和类创建实例，属性方法的位置
- [ ] require.ensure()
- [x]  vue:如果传给子组件的数据变了，子组件会重新渲染么？ 因为是 props, 没有在data里面
  - [x]  经测试，会的
- [x]]  vuex的store是只有这一串父子组件可以访问还是整个应用都可以访问？
  - [x]  经测试，刚进入页面的时候可以访问到，刷新页面就没了，所以这个vuex只能用于存储一串父子组件的状态，不能用于存储作用于整个应用的变量。
- [ ]  给项目添加yarn lint
- [x]  vue开发规范
- [ ]  有哪些机制下，页面会渲染？比如，state变了？
- [ ]  ❤️ 常用的vue业务场景总结并写成项目---my-vue
  - 1. [ ] 文件上传 
  - 2. [x] 项目结构规范
  - 3. [ ] 图片压缩
  - 4. [ ] 文件预览 
  - 5. [ ] 一个页面的结构
  - 6. [ ] 上拉更多，下拉刷新
- [x]  整理一下那几个todolist的例子
- [ ]  手写react webpack脚手架
- [ ]  看react源码视频
- [ ]  lodash深拷贝
- [ ]  从掘金看的深拷贝，怎么处理循环引用问题的
- [ ]  Object和Map的转换
- [ ]  介绍一下执行上下文
- [ ]  递归，迭代（递归已经明白了）
- [ ]  原型和原型链问题
- [ ]  闭包及其场景还没总结完
- [ ]  对象有很多方法
- [ ]  算法类：排序问题
- [ ]  Redux源码看一看，之前真的把Redux想的太难了，现在发现也没啥东西，就是把state放在一个大家都能访问和修改的文件里面嘛
- [ ]  在react 的DOM中调用函数时候传递的bind的this,是不是就是整个class的实例？？？<img src='/Blog/images/react调用函数传递的this.png'>
- [x]  Redux学习
- [x]  call和apply,bind,还差手写bind
- [x]  函数柯里化
- [x]  函数的扩展
- [x]  node常用的方法总结一下，不然下次还要去找
- [ ]  看react redux的源码reducer函数，阮一峰的[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)中说叫readucer的原因是他可以作为数组的reduce方法的参数1？？？？为什么？
- [ ]  React源码视频里面讲的 `component` 和 `pureComponent` 区别是啥来着？我怎么忘了？好像pure多个啥东西
- [ ]  我有一个疑问，如果一个组件的子组件触发修改了某条数组，那页面不会重新渲染么？
- [ ]  我一直都对这个静态类型检测不熟悉
```javascript
  static propTypes = {
    comments: PropTypes.array,
    onSubmit: PropTypes.func
  };
```
- [ ] 类没有this, 必须使用super才可以访问this? 复习下ES6 class章节
```javascript
  constructor() {
    super();
    this.state = {
      username: ""
    };
  }
```




