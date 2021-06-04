1. [x] 单点登录sso? 同域名？跨域？淘宝和天猫的单点登录实现？
2. [x] 前端鉴权？
3. [x] 输入URL发生了什么？
4. [ ] 什么对称加密？什么是非对称加密？
5. [ ] 什么是oAuth 2.0? 解决了什么问题？
6. [ ] 什么是BFC？ 如何创建BFC？
7. [ ] nginx代理的理解
8. [ ] get和post区别？
9.  [ ] 前端性能优化手段？
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
20. [ ] 以下代码的打印顺序是什么？为什么？
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

20. [ ] 以下代码的打印顺序是什么？为什么？
21. [ ]


