1.  [x] 单点登录 sso? 同域名？跨域？淘宝和天猫的单点登录实现？
2.  [x] 前端鉴权？
3.  [x] 浏览器输入 URL 发生了什么？
4.  [x] [缓存](https://juejin.cn/post/6947936223126093861#heading-1)
    - 什么是缓存？
    - 缓存有什么好处？
    - 缓存位置？
    - 什么是强缓存？
    - 什么是协商缓存？
    - 强缓存和协商缓存的区别？
5.  [x] HTTP 和 http2 有什么区别？
6.  [x] [什么是 oAuth 2.0? 解决了什么问题？](')
7.  [x] [一个 tcp 连接能发几个 http 请求]
    1.  [木易杨的博客，较为简介](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/1)
    2.  [developers.google.com,文档较为全面官方](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn)
8.  [x] margin 塌陷?
    1.  [x] 有没有遇到过其他 css 问题？
9.  [x] [字节跳动] [common.js 和 es6 中模块引入的区别？](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/5)
10. [ ] 什么对称加密？什么是非对称加密？
11. [ ] 什么是 BFC？ 如何创建 BFC？
12. [ ] nginx 代理的理解
13. [x] get 和 post 区别？
14. [x] 前端性能优化手段？
    1.  [ ] 网络
    2.  [ ] webpack 打包
    3.  [ ] vue 代码优化
15. [ ] 前端鉴权？
16. [ ] 什么对称加密？什么是非对称加密？
17. [ ] 什么是 oAuth 2.0? 解决了什么问题？
18. [ ] 什么是 BFC？ 如何创建 BFC？
19. [x] 前端鉴权？
20. [ ] setInterval 模拟 setTimeout? setInterval 有什么问题？
21. [x] CSS 选择器的权重 、权级
22. [ ] 为什么渲染列表要加 key? react & vue
23. [ ] Vue 双向绑定的原理？
24. [ ] Vue 实现响应式的原理？
25. [ ] 什么是跨域？
26. [ ] 项目中跨域的解决方案？
27. [x] event loop? js 和 node 的 event loop 有什么区别？
    1.  [x] [react setState 是同步还是异步？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)
    2.  [x] vue data 的更新是同步还是异步？
28. [ ] await 等的是什么？
29. [ ] 虚拟 DOM 是什么？为什么提出？
30. [ ] 你有哪些好的代码习惯？
31. [ ] vue 是如何转为真实 dom?
32. [ ] call 和 apply 的原理是什么？
33. [ ] 手写类
    1.  [x] 手写 bind
    2.  [ ] 手写 promise
    3.  [x] 手写 柯里化实现？普通版和高级版
    4.  [ ] 手写 实现深拷贝
34. [ ] 大数相加
35. [ ] 闭包
    1.  [ ] 什么是闭包？
    2.  [ ] 闭包原理？
    3.  [ ] 闭包应用场景？
    4.  [ ] 闭包常见的坑？
36. [ ] new 的时候发生了什么？
37. [ ] 如何正确判断 this 在各种情况下的指向
38. [ ] 什么是防抖？什么是节流？如何实现？
39. [ ] 继承
    1.  [ ] 实现继承的方式？
    2.  [ ] 优缺点是什么？
40. [ ] 箭头函数有哪些特点？
41. [ ] 判断数据类型的方法有哪些？区别是什么？
42. [ ] 说一下对原型链的理解？
43. [ ] 判断两个对象相等？
44. [ ] 模块化规范有哪些？
45. [ ] 前中后序遍历？
46. [ ] 遍历
    1.  [ ] 深度优先遍历？
    2.  [ ] 广度优先遍历？
47. [ ] CDN 原理
48. [ ] CSS 优化讲一下？??
49. [ ] 前端有哪些地方可以优化？
50. [ ] 几种缓存策略的对比简单说一下？
51. [ ] 如何实现一个同花顺？写代码如何实现？（七张牌同一花色并且数字相连）
52. [ ] display 有哪些属性值？
53. [ ] 块级元素与内联元素的区别？
54. [ ] 冒泡排序的复杂度是多少？快排呢？
55. [ ] 如何实现快排？
56. [ ] JS 的基本数据类型
57. [ ] 获取 DOM 节点的几个方法？
58. [ ] 如何给 DOM 节点上添加事件？
59. [ ] 如何实现水平垂直居中？
60. [ ] HTTP 状态码有哪些？
61. [ ] 如何实现二分查找？（迭代版和递归版，问那个效率高一些）
62. [ ] JavaScript 递归转循环？（表示这个没有听过）
63. [ ] 如何用原生 JS 实现一个队列？
64. [ ] 如何实现一个栈？（两种方法，然后问哪个效率高一些？）
65. [ ] 原型链？讲下有什么作用？ES6 中 Class 与原型的关系
66. [ ] 为什么 Class 中 constructor 里面定义的属性是对象本身的属性？
67. [ ] ES6 Proxy 的概念？（表示没有用过，不知道适合哪种应用）
68. [ ] 闭包？运行时上下文里面包括什么？
69. [ ] [浏览器的回流与重绘?](https://juejin.im/post/6844903569087266823)
70. [ ] [virtual DOM 的优势](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/3)
71. [ ] 以下代码的打印顺序是什么？为什么？（考察宏任务，微任务，同步任务，EventLoop）

```js
/* 题目一 */
async function async1() {
  console.log("1");
  await async2();
  console.log("2");
}

async function async2() {
  console.log("3");
}

console.log("4");

setTimeout(function () {
  console.log("5");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("6");
  resolve();
}).then(function () {
  console.log("7");
});

console.log("8");

/**
 * 结果
 * 4
 * 1
 * 3
 * 6
 * 8
 * 2
 * 7
 * 5
 *
 *
 */

/* 题目二 */
async function async1() {
  console.log("1");
  await async2();
  console.log("2");
}
async function async2() {
  //async2做出如下更改：
  new Promise(function (resolve) {
    console.log("3");
    resolve();
  }).then(function () {
    console.log("4");
  });
}
console.log("5");

setTimeout(function () {
  console.log("6");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("7");
  resolve();
}).then(function () {
  console.log("8");
});

console.log("9");

/**
 * 5
 * 1
 * 3
 * 7
 * 9
 * 4
 * 2
 * 8
 * 6
 *
 */

/* 题目三 */

async function a1() {
  console.log("1");
  await a2();
  console.log("2");
}
async function a2() {
  console.log("3");
}
//
console.log("4");
//
setTimeout(() => {
  console.log("5");
}, 0);
//
Promise.resolve().then(() => {
  console.log("6");
});
//
a1();
//
let promise2 = new Promise((resolve) => {
  resolve("7");
  console.log("8");
});
//
promise2.then((res) => {
  console.log(res);
  Promise.resolve().then(() => {
    console.log("9");
  });
});
//
console.log("10");

/**
 * 4
 * 1
 * 3
 * 8
 * 10
 * 6
 * 2
 * 7
 * 9
 * 5
 */
```
