# EventLoop



>函数调用栈、事件队列、内存的视图表现

<img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg" alt="11">



## 浏览器中的Evenploop做了什么?

因为js是单线程的，所以如果某个任务（I/O, ajax）耗时过长，就会导致浏览器无法处理其他事件，如用户click、滚动、moveup等等。

所以将一些耗时较长的任务处理为非阻塞任务，即宏任务，通常有

1. Promise
2. I/O
3. setTimeout, setInterval
4. requestAnimationFrame

微任务有

1. Promise的方法：Promise.then, catch, finally等
2. MutationObserver



## EventLoop执行流程

函数从上向下依次执行，
- 如果遇到同步任务，直接执行，
- 遇到宏任务，加入 `Task Queue`
- 遇到微任务，加入 `Micro Task Queue`

宏任务的事件有了结果后，会把回调函数加入函数调用栈

本轮执行完毕后，去检查函数调用栈，执行其中的任务

- 执行完一只宏任务，
- 执行所有的微任务队列

如此循环往复下去










<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--I8K4E512--/c_limit,f_auto,fl_progressive,q_auto,w_880/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tg7893fgvd0q8im1fy3s.png">


浏览器中有多个概念

1. Heap, **堆**，存储定义的引用数据类型
2. Call stack, **调用堆栈**
3. Web Api, 浏览器提供的一些方法，供代码调用
4. Queue, 先进后出, Macro task Queue 和 Maico task Queue, 不同优先级的任务










## 参考

- [Event loop: microtasks and macrotasks](https://javascript.info/event-loop#macrotasks-and-microtasks)
- [Difference between the Event Loop in Browser and Node Js?](https://dev.to/jasmin/difference-between-the-event-loop-in-browser-and-node-js-1113)
- [Why is the EventLoop for Browsers and Node.js Designed This Way?](https://blog.bitsrc.io/why-is-the-eventloop-for-browsers-and-node-js-designed-this-way-f7f794696c)



