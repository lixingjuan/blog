
1.  [x] 单点登录sso? 同域名？跨域？淘宝和天猫的单点登录实现？
2.  [x] 前端鉴权？
3.  [x] 浏览器输入URL发生了什么？
5.  [x] [缓存](https://juejin.cn/post/6947936223126093861#heading-1)
    - 什么是缓存？
    - 缓存有什么好处？
    - 缓存位置？
    - 什么是强缓存？
    - 什么是协商缓存？
    - 强缓存和协商缓存的区别？
6.  [x] HTTP和http2有什么区别？
7.  [x] [什么是oAuth 2.0? 解决了什么问题？]()
8.  [x] [一个 tcp 连接能发几个 http 请求]
    1.  [木易杨的博客，较为简介](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/1)
    2.  [developers.google.com,文档较为全面官方](https://developers.google.com/web/fundamentals/performance/http2?hl=zh-cn)
9.  [x] margin 塌陷?
    1.  [x] 有没有遇到过其他 css 问题？
10. [x] [字节跳动] [common.js 和 es6 中模块引入的区别？](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/5)
11. [ ] 什么对称加密？什么是非对称加密？
12. [ ] 什么是BFC？ 如何创建BFC？
13. [ ] nginx代理的理解
14. [x] get和post区别？
15. [x] 前端性能优化手段？
    1.  [ ] 网络
    2.  [ ] webpack打包
    3.  [ ] vue代码优化
16. [ ]  前端鉴权？
17. [ ]  什么对称加密？什么是非对称加密？
18. [ ]  什么是oAuth 2.0? 解决了什么问题？
19. [ ]  什么是BFC？ 如何创建BFC？
20. [x]  前端鉴权？
21. [ ] setInterval 模拟setTimeout? setInterval有什么问题？
22. [x] CSS选择器的权重 、权级
23. [ ] 为什么渲染列表要加key? react & vue
24. [ ] Vue双向绑定的原理？
25. [ ] Vue实现响应式的原理？
26. [ ] 什么是跨域？
27. [ ] 项目中跨域的解决方案？
28. [x] event loop? js和node的event loop 有什么区别？
    1.  [x] [react setState是同步还是异步？](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/17)
    2.  [x] vue data的更新是同步还是异步？
29. [ ] await等的是什么？
30. [ ] 虚拟DOM是什么？为什么提出？
31. [ ] 你有哪些好的代码习惯？
32. [ ] vue是如何转为真实dom?
33. [ ] call和apply的原理是什么？
34. [ ] 手写类
    1.  [x] 手写bind
    2.  [ ] 手写promise
    3.  [x] 手写 柯里化实现？普通版和高级版
    4.  [ ] 手写 实现深拷贝
35. [ ] 大数相加
36. [ ] 闭包
    1.  [ ] 什么是闭包？
    2.  [ ] 闭包原理？
    3.  [ ] 闭包应用场景？
    4.  [ ] 闭包常见的坑？
37. [ ] new的时候发生了什么？
38. [ ] 如何正确判断this在各种情况下的指向
39. [ ] 什么是防抖？什么是节流？如何实现？
40. [ ] 继承
    1.  [ ] 实现继承的方式？
    2.  [ ] 优缺点是什么？
41. [ ] 箭头函数有哪些特点？
42. [ ] 判断数据类型的方法有哪些？区别是什么？
43. [ ] 说一下对原型链的理解？
44. [ ] 判断两个对象相等？
45. [ ] 模块化规范有哪些？
46. [ ] 前中后序遍历？
47. [ ] 遍历
    1.  [ ] 深度优先遍历？
    2.  [ ] 广度优先遍历？
48. [ ] CDN 原理
49. [ ] CSS优化讲一下？??
50. [ ] 前端有哪些地方可以优化？
51. [ ] 几种缓存策略的对比简单说一下？
52. [ ] 如何实现一个同花顺？写代码如何实现？（七张牌同一花色并且数字相连）
53. [ ] display有哪些属性值？
54. [ ] 块级元素与内联元素的区别？
55. [ ] 冒泡排序的复杂度是多少？快排呢？
56. [ ] 如何实现快排？
57. [ ] JS的基本数据类型
58. [ ] 获取DOM节点的几个方法？
59. [ ] 如何给DOM节点上添加事件？
60. [ ] 如何实现水平垂直居中？
61. [ ] HTTP状态码有哪些？
62. [ ] 如何实现二分查找？（迭代版和递归版，问那个效率高一些）
63. [ ] JavaScript递归转循环？（表示这个没有听过）
64. [ ] 如何用原生JS实现一个队列？
65. [ ] 如何实现一个栈？（两种方法，然后问哪个效率高一些？）
66. [ ] 原型链？讲下有什么作用？ES6中Class与原型的关系
67. [ ] 为什么 Class 中constructor 里面定义的属性是对象本身的属性？
68. [ ] ES6 Proxy的概念？（表示没有用过，不知道适合哪种应用）
69. [ ] 闭包？运行时上下文里面包括什么？
70. [ ] [浏览器的回流与重绘?](https://juejin.im/post/6844903569087266823)
71. [ ] [virtual DOM的优势](https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues/3)
72. [ ] 以下代码的打印顺序是什么？为什么？（考察宏任务，微任务，同步任务，EventLoop）
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

