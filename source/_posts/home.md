---
title: 'Home'
comments: false
---

<script async defer src="https://buttons.github.io/buttons.js"></script>

# Hello 

这里是李幸娟博客的首页！！！:)
该博客仅用于日常学习的记录，如有错误或问题请联系我 (邮箱：18236129679@163.com)


<img src='/Blog/images/home-banner.svg' />


keep hungry, and eat 🥤🐂🍔🍗🍰☕️🍉🍒🍦🍭🌽🍓🍇🥬🥒🥕🥞🧇🥓🥩🍖🌭🍕🥙🌮🥗🥘🍝🍣🍱🍥🍧🍨🧁


## 杂七杂八的

1.  blur和change区别；
2.  [ ]  vue-todo-list + 使用gitpage展示;
    1.  [x]  配置gitpage;
    2.  [ ]  添加删除全部按钮；
    3.  [ ]  列表项目杭高；
    4.  [ ]  飘雪花效果；
    5.  [ ]  添加todo添加时间；
3. [x]  vue-antd 实现 checkbox 放大和修改样式的效果；
4. [ ]  项目添加提交校验（console\dbugger\alert）
5. [x]  继承相关；
6. [x]  vuex 的store 是只有这一串父子组件可以访问还是整个应用都可以访问？整个应用
   1. [x]  经测试，刚进入页面的时候可以访问到，刷新页面就没了，所以这个vuex只能用于存储一串父子组件的状态，不能用于存储作用于整个应用的变量；
7. [ ]  总结: 前端模块化规范，AMD，CMD等；
8. [x]  函数柯里化;
9. [x]  函数的方法扩展;
10. [x]  call和apply,bind,实现bind
11. [x]  node常用的方法总结;
12. [ ]  总结，new创建函数过程；
13. [ ]  require.ensure()
14. [x]  给项目添加yarn lintß
15. [ ]  有哪些机制下，页面会渲染？比如，state变了？
16. [ ]  ❤️ 常用的vue业务场景总结并写成项目---my-vue
    1. [x]  项目结构规范
    2. [ ]  图片压缩
    3. [x]  文件上传
    4. [ ]  文件预览
    5. [ ]  一个页面的结构
    6. [x]  上拉更多，下拉刷新
17. [x]  从掘金看的深拷贝，怎么处理循环引用问题的;
18. [ ]  Object和Map的转换
19. [ ]  总结: 执行上下文;
20. [x]  lodash深拷贝;
21. [ ]  递归，迭代（递归已经明白了）
22. [x]  原型和原型链问题
23. [ ]  闭包及其场景还没总结完
24. [ ]  对象有很多方法;
25. [ ]  Redux源码看一看，之前真的把Redux想的太难了，现在发现也没啥东西，就是把state放在一个大家都能访问和修改的文件里面嘛
26. [x]  vue:如果传给子组件的数据变了，子组件会重新渲染么？ 因为是 props, 没有在data里面 => 会的
27. [ ]  手写react webpack脚手架
28. [ ]  在react 的DOM中调用函数时候传递的bind的this,是不是就是整个class的实例？？？<img src='/Blog/images/react调用函数传递的this.png'>
29. [x]  Redux学习
30. [ ]  看react redux的源码reducer函数，阮一峰的[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)中说叫readucer的原因是他可以作为数组的reduce方法的参数1？？？？为什么？
31. [ ]  React源码视频里面讲的 `component` 和 `pureComponent` 区别是啥来着？我怎么忘了？好像pure多个啥东西
32. [ ]  我有一个疑问，如果一个组件的子组件触发修改了某条数组，那页面不会重新渲染么？即，深度监听；
33. [ ]  我一直都对这个静态类型检测不熟悉;

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

## vue相关

1. [ ]  深度监听具体的解决办法，我看使用$set, 一定会定义一个函数，并不适用v-model 的情况；
2. [x]  vue开发规范

## 算法相关

1. [x]  二叉树前、中、后序排序；


## CSS相关

1. [x]  less大概看一下，心里有个数
2. [x]  实现居中的几种方法总结下
3. [ ]  包括flex的特性失效的情况
4. [x]  布局：
   1. [x]  圣杯布局/双翼杯布局(中间先渲染，两侧固定宽度，中间自适应)

## 持续pending的TODO

1. [ ]  vue源码学习;
2. [ ]  看react源码视频;
3. [ ]  整理代码简介之道的一些实用技巧；


## 总结



CSS
1. [ ]  移动端1px怎么处理？出现原因;
2. [ ]  rem和em区别？
3. [ ]  处理过哪些css兼容性问题？
4. [ ]  用什么css预编译器(我说的scss)？你认为 scss 和css 的区别？


Javascript
1. [ ]  forEach 和 for循环区别？如何停止？(详见for和forEach区别)
   1. forEach 
      1. 适用于不清楚循环次数或判断长度耗费性能；
      2. 除了抛出异常，无法终止循环；
   2. for
      1. 循环可以使用continue，break 来控制循环和跳出循环；
      2. 
2. [ ]  常用的es6有哪些？
3. [ ]  every和some区别？
4. [x]  new Set([undefined,NaN,NaN,1,'1',{},{}])  的处理结果？
   1. 结果： { undefined, NaN, 1, '1', {}, {} }
   2. Set加入值的时候不会进行类型转换；
   3. Set比较值使用的 “Same-value-zero equality” 算法，该算法与 === 的区别在于，认为 NaN等于自身；
   4. (无论哪个算法) 对象永远是不相等的；
5. [ ]  ES6，你常用的特性有哪些？



vue
1. [ ]  key值相同会怎么样？为什么不能相同？
2. [ ]  你认为React和Vue优缺点？


打包
1. [ ]  打包工具(我说的webpack, 但是看他不是很满意)



其他
1. [ ]  项目中遇到的印象深刻的问题？
2. [ ]  flutter晓得不?（想看我是否对新技术有了解）
3. [ ]  你认为前端要学什么？（说这个加分，看知识面）
4. [ ]  有哪些开发小程序？
5. [ ]  你有什么想问我的么？
6. [ ]  H5项目，如何处理兼容性？
7. [ ]  对项目有什么技术推动？有团队内做过技术分享么？分享的什么？
8. [ ]  怎么学习前端的？(我说看书，看视频，看博客)看了哪些书？


