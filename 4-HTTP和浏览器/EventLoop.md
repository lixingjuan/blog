# 事件循环（Event Loop）

事件循环（Event Loop）是程序运行时，系统处理异步事件的一种机制。
但是浏览器和Node.js的处理方式有一些区别，主要体现在任务队列的处理和微任务的概念上。

## 浏览器环境

浏览器机制下，加载页面的时候，浏览器会先执行全局脚本，全局脚本也可以认为是一个宏任务，执行宏任务时，

1. 如果遇到同步任务，会直接在调用栈（Call Stack）中执行；
2. 如果遇到宏任务，例如setTimeout、setInterval、I/O操作等, 会加入宏任务队列；
3. 如果遇到微任务，例如Promise.then/catch/finally, MutationObserver, 会加入微任务队列；
4. 当前宏任务执行完毕后，事件循环会执行所有该宏任务执行期间产生的所有微任务；
5. 宏任务和微任务执行完毕后， JavaScript引擎会从宏任务队列取出一个宏任务，开始下一轮的事件循环

浏览器环境中
宏任务：

1. setTimeout、setInterval、
2. I/O操作：网络请求
3. 用户事件：点击事件、滚动时间等的回调函数
4. postMessage等
5. UI渲染: 页面
6. requestAnimitionFrame：
7. `<script></script>`标签的执行

微任务：

1. Promise的回调
2. await后面的代码
3. MutationObserver的回调

## Node.js

和浏览器环境的事件循环的区别，“执行顺序”和“任务分类”上，Node.js中的事件循环分为几个主要阶段

1. **timer定时器**：处理已经设置的setTimeout、setInterval的回调
2. **回调阶段**：处理大多数的异步I/O回调，除了关闭的回调、被延迟到下一次循环迭代的回调、setImmediate
3. **prepare 闲置、准备阶段**：仅内部使用；
4. **poll 轮询阶段**：检索新的I/O事件，执行与I/O相关的回调（除了close事件、定时器和setImmediate的回调）
5. **check 检查阶段**：setImmediate的回调在这里执行
6. **close 关闭事件回调阶段**：例如socket.on('close', ...)。


**微任务**
Promise：Promise的.then、.catch或.finally注册的回调会成为微任务，等待事件循环的下一个“滴答”。
process.nextTick：当前事件循环阶段的所有同步操作和Promise的回调完成后，下一个阶段开始前执行

## 二者的区别

1. Node.js中，事件循环有明确的阶段，每个阶段都有自己的任务队列，事件循环会按阶段顺序执行队列中的任务;
2. Node.js中，每个阶段的开始和结束都会执行微任务，微任务的来源主要是Promise.then/catch/finally, 和 process.nextTick;
3. setImmediate是Node.js独有的;

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--I8K4E512--/c_limit,f_auto,fl_progressive,q_auto,w_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg7893fgvd0q8im1fy3s.png">
