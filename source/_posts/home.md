---
title: 'Home'
comments: false
---

<script async defer src="https://buttons.github.io/buttons.js"></script>

# Hello

🍉，这里是李幸娟博客的首页！！！:)

## TODOList

❤️ 最重要


- [ ]  vue:如果传给子组件的数据变了，子组件会重新渲染么？ 因为是 props, 没有在data里面
- [ ]  有哪些机制下，页面会渲染？比如，state变了？
- [ ]  ❤️ 常用的vue业务场景总结并写成项目
  - [ ]  1. 文件上传 
  - [ ]  2. 文件预览 
  - [ ]  3. 图片压缩
- [ ]  整理一下那几个todolist的例子
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


******************************

<p style="color:#c06f98;font-size:1.5rem" ><b>二月份技术总结</b></p>

# 看lodash源码的一些总结

## 位掩码

### 基础原理

1. 按位与（&）：仅当 相应的操作位 都为1时结果为1，否则为0；
  - 0 & 1= 0
  - 0 & 0= 0
  - 1 & 1= 1
2. 按位或（|）：仅当 相应的操作位 都为0时结果为0，否则为1；
  - 0 | 1= 1
  - 0 | 0= 0
  - 1 | 1= 1

### 实际应用
1. 拥有四个不同的权限，根据传入的位掩码标志来判断拥有哪几个权限

| 权限  | 代表数字 | 代表数字二进制 |
|-------|----------|----------------|
| 权限A | 1        | 0001           |
| 权限B | 2        | 0010           |
| 权限C | 4        | 0100           |
| 权限D | 8        | 1000           |


<!-- <div style="width:35%;font-size:0.3rem;"> -->

| 拥有权限 | 传入数字 | 传入数字二进制 | 解释                     |
|----------|----------|----------------|--------------------------|
| 权限A    | 1        | 0001           | userA = 0b0001            |
| 权限B    | 2        | 0010           | userB = 0b0010            |
| 权限AB   | 3        | 0011           | userAB = 0b0001 \| 0b0010  |
| 权限ABC  | 7        | 0111           | userABC = 0b0001 \| 0b0010 \| 0b0100 |
| 权限ABCD | 8        | 1111           |                           |
<!-- </div> -->


```javascript
// 传入的位掩码标志
let bismaskFlag; // 设为7 即 0b0111, 即拥有权限ABC

/* 判断是否拥有权限 B */
const hasPermissionB = bismaskFlag | 0b0010 === bismaskFlag; // true

/* 指定用户拥有哪个权限 */
// 写法1 
const userBD_1 = 0b0010 | 0b1000
// 写法2
const userBD_2 = 2 | 8

```


## 深拷贝整体思路

## 函数柯里化
1. 定义
  - 将多个参数的函数
2. 实现

## lodash比较值是否相等
1. lodash的写法：

```javascript

function eq(value1, value2) {
  return value1 === value2 || (value1 !== value1 && value2 !== value2);
}

```

2. 不使用Object.is 原因：
  - `Object.is(+0,-0); // false `
3. 不使用isNaN 原因：
  - `isNaN('x'); // true `
  - 改进：使用 `Number.isNaN()`  `Number.isNaN('x'); // false `
4. 比较值相等时常用方法各自特点

| 方法      | 特点1              | 特点2            |
|-----------|--------------------|------------------|
| ==        | 会自动进行类型转换 | --               |
| ===       | 认为NaN不等于NaN   | 认为+0 等于 -0   |
| Object.is | 认为NaN等于NaN     | 认为+0 不等于 -0 |

