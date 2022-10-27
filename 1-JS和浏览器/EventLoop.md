# EventLoop



>函数调用栈、事件队列、内存的视图表现

<img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg" alt="11">


## Browser

任务分类，
1. **同步任务**: 在**主线程**执行;
2. **异步任务（宏任务 和 微任务）**: 在**事件队列**等待;


宏任务有
1. I/O
2. Promise
3. setTimeout, setInterval
4. requestAnimationFrame

微任务
1. Promise的方法：Promise.then, catch, finally等
2. MutationObserver



<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--I8K4E512--/c_limit,f_auto,fl_progressive,q_auto,w_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg7893fgvd0q8im1fy3s.png">


浏览器中有多个概念

1. Heap, **堆**，存储定义的引用数据类型
2. Call stack, **调用堆栈**
3. Web Api, 浏览器提供的一些方法，供代码调用
4. Queue, 先进后出, Macro task Queue 和 Maico task Queue, 不同优先级的任务




## Node

Node.js 中，任务氛围不同的阶段，从而将事件分为不同的优先级，分别是

五种类型的宏任务
1. Timers：因为涉及时间，所以越早执行越精确
2. Pending：一些网络、I/O 和其他异常
3. Poll: 处理I/O数据和网络连接
4. Check：执行setimatiate的回调
5. Close：关闭资源的回调

两种类型的微任务
1. process.nextTick
2. 其他微任务


## Node.js 和 浏览器 EventLoop区别

1. 浏览器: 执行一个宏任务，然后执行所有的微任务，然后执行下一个宏任务，然后执行对应的微任务；
2. Node.js的任务优先级划分更为精细: **会先执行当前阶段一定数量的宏任务，然后执行所有的微任务；再去下一个阶段执行一定数量的宏任务，然后执行所有的微任务**


**为什么是一定数量呢？**
是因为，如果当前阶段执行太多宏任务，那一直无法进入下一个阶段。


另外，Node.js有使用一个叫做libuv的库，默认会创建4个线程，分别执行不同的任务，该库负责**调度**这些线程







## 参考

- [Difference between the Event Loop in Browser and Node Js?](https://dev.to/jasmin/difference-between-the-event-loop-in-browser-and-node-js-1113)
- [Why is the EventLoop for Browsers and Node.js Designed This Way?](https://blog.bitsrc.io/why-is-the-eventloop-for-browsers-and-node-js-designed-this-way-f7f794696c)

