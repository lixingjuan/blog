1. [x] 单点登录sso? 同域名？跨域？淘宝和天猫的单点登录实现？
2. [x] 前端鉴权？
3. [x] 浏览器输入URL发生了什么？
   1. [x] 什么是强缓存？什么是协商缓存？
4. [ ] 什么对称加密？什么是非对称加密？
6. [ ] 什么是BFC？ 如何创建BFC？
7. [ ] nginx代理的理解
8. [x] get和post区别？
9.  [x] 前端性能优化手段？
    1.  [ ] 网络
    2.  [ ] webpack打包
    3.  [ ] vue代码优化
10. [x] 单点登录sso? 同域名？跨域？淘宝和天猫的单点登录实现？
11. [ ] setInterval 模拟setTimeout? setInterval有什么问题？
12. [x] CSS选择器的权重 、权级
13. [ ] 为什么渲染列表要加key? react & vue
14. [ ] Vue双向绑定的原理？
15. [ ] Vue实现响应式的原理？
16. [ ] 什么是跨域？
17. [ ] 项目中跨域的解决方案？
18. [x] event loop? js和node的event loop 有什么区别？
    1.  [x] react setState是同步还是异步？
    2.  [x] vue data的更新是同步还是异步？
19. [ ] await等的是什么？
20. [ ] 以下代码的打印顺序是什么？为什么？（考察宏任务，微任务，同步任务，EventLoop）
```js
/* 题目一 */
async function async1() {
    console.log('1');
    await async2();
    console.log('2');
}

async function async2() {
    console.log('3');
}

console.log('4');

setTimeout(function() {
    console.log('5');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('6');
    resolve();
}).then(function() {
    console.log('7');
});

console.log('8');


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
    console.log('1');
    await async2();
    console.log('2');
}
async function async2() {
    //async2做出如下更改：
    new Promise(function(resolve) {
    console.log('3');
    resolve();
}).then(function() {
    console.log('4');
    });
}
console.log('5');

setTimeout(function() {
    console.log('6');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('7');
    resolve();
}).then(function() {
    console.log('8');
});

console.log('9');


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


async function a1 () {
    console.log('1')
    await a2()
    console.log('2')
}
async function a2 () {
    console.log('3')
}
//
console.log('4')
//
setTimeout(() => {
    console.log('5')
}, 0)
//
Promise.resolve().then(() => {
    console.log('6')
})
//
a1()
//
let promise2 = new Promise((resolve) => {
    resolve('7')
    console.log('8')
})
//
promise2.then((res) => {
    console.log(res)
    Promise.resolve().then(() => {
        console.log('9')
    })
})
//
console.log('10')

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

21. [ ] 虚拟DOM是什么？为什么提出？
22. [ ] 你有哪些好的代码习惯？
23. [ ] vue是如何转为真实dom?
24. [x] 缓存
    - 什么是缓存？
    - 缓存有什么好处？
    - 缓存位置？
    - 什么是强缓存？
    - 什么是协商缓存？
    - 强缓存和协商缓存的区别？
25. [x] HTTP和http2有什么区别？
26. [x] 什么是oAuth 2.0? 解决了什么问题？
27. [ ] call和apply的原理是什么？
28. [ ] 手写类
    1.  [ ] 手写bind
    2.  [ ] 手写promise
    3.  [ ] 手写 柯里化实现？普通版和高级版
    4.  [ ] 手写 实现深拷贝
29. [ ] 闭包
    1.  [ ] 什么是闭包？
    2.  [ ] 闭包原理？
    3.  [ ] 闭包应用场景？
    4.  [ ] 闭包常见的坑？
30. [ ] new的时候发生了什么？
31. [ ] 如何正确判断this在各种情况下的指向
32. [ ] 什么是防抖？什么是节流？如何实现？
33. [ ] 继承
    1.  [ ] 实现继承的方式？
    2.  [ ] 优缺点是什么？
34. [ ] 箭头函数有哪些特点？
35. [ ] 判断数据类型的方法有哪些？区别是什么？
36. [ ] 说一下对原型链的理解？
37. [ ] 判断两个对象相等？
38. [ ] 模块化规范有哪些？
39. [ ] 前中后序遍历？
40. [ ] 遍历
    1.  [ ] 深度优先遍历？
    2.  [ ] 广度优先遍历？
41. [ ] CDN 原理
43. [ ]  CSS优化讲一下？??
44. [ ]  前端有哪些地方可以优化？
45. [ ]  几种缓存策略的对比简单说一下？
46. [ ]  如何实现一个同花顺？写代码如何实现？（七张牌同一花色并且数字相连）
47. [ ]  display有哪些属性值？
48. [ ] 块级元素与内联元素的区别？
49. [ ] 冒泡排序的复杂度是多少？快排呢？
50. [ ] 如何实现快排？
51. [ ] JS的基本数据类型
52. [ ] 获取DOM节点的几个方法？
53. [ ] 如何给DOM节点上添加事件？
54. [ ] 如何实现水平垂直居中？
55. [ ] position的属性值有哪些？
56. [ ] HTTP状态码有哪些？
58. [ ] 如何实现二分查找？（迭代版和递归版，问那个效率高一些）
59. [ ] JavaScript递归转循环？（表示这个没有听过）
60. [ ] 如何用原生JS实现一个队列？
61. [ ] 如何实现一个栈？（两种方法，然后问哪个效率高一些？）
62. [ ] 数组删除元素的方法
63. [ ] 添加元素的方法
64. [ ] join()方法？sort()方法
65. [ ] 原型链？讲下有什么作用？ES6中Class与原型的关系
66. [ ] 为什么 Class 中constructor 里面定义的属性是对象本身的属性？
67. [ ] ES6 Proxy的概念？（表示没有用过，不知道适合哪种应用）
68. [ ] 还用过ES6的哪些新的特性？
69. [ ] 闭包？运行时上下文里面包括什么？
71. [ ] [浏览器的回流与重绘?](https://juejin.im/post/6844903569087266823)
72. [ ] [virtual DOM的优势](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/3)
73. [x] 一个 tcp 连接能发几个 http 请求
74. [x] margin 塌陷?
    1.  [ ] 有没有遇到过其他 css 问题？
75. [ ] [字节跳动] common.js 和 es6 中模块引入的区别？

