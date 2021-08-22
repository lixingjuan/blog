# 1. EventLoop

> 函数调用栈、事件队列、内存的视图表现

<img src="https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop/the_javascript_runtime_environment_example.svg" alt="">


## 1.1. 你了解浏览器的事件循环么？

<details>
<summary>click here</summary>
任务分为宏任务，微任务
</details>







## 1.2. 为什么js在浏览器中有事件循环的机制？

<details>
<summary>click here</summary>
因为浏览器是单线程，那我们就只能就只能从上往下一步一步的执行那吗，这样的话，CPU的利用率就会比较低，所以提出事件循环机制来实现非阻塞事件
</details>


## 1.3. 分了宏任务，微任务有什么优势？


<details>
<summary>clike here</summary>

单线程就意味着所有任务都需要排队，前一个任务执行完，才会执行下一个任务。如果前一个任务耗时很长，后一个任务就需要一直等待, 这种机制导致很多时候，CPU都是空闲的。因为I/O设备很慢（比如网络请求）, CPU会一直等待结果出来，再往下执行计算, 这样造成CPU大量时间都是等待过程，由于js的解析机制是从上向下按顺序解析，如果网络卡顿，就会堵塞页面渲染, 于是js语言的设计者意识到，这时主线程完全可以不管IO设备，挂起等待中的任务，先运行排在后面的任务，等IO设备返回了结果，再回过头执行挂起的任务。

所以, 将所有的任务分为两种：**同步任务** 和 **异步任务**；

- 同步任务指，在**主线程**上排队执行的任务，只有当前一个任务执行完毕，才会执行下一个任务；
- 异步任务指，**不进入主线程**，而进入任务队列（task queue）的任务, 只有任务队列通知主线程异步任务可以执行了，该异步任务才会进入主线程；

</details>


## 1.4. 浏览器为什么设计为单线程的？

<details>
<summary>click here</summary>
因为JavaScript主要工作在浏览器，而浏览器的主要工作是实现用户交互，效果呈现, 如果一个线程在一个DOM节点修改内容，另一个线程删除了该DOM节点，此时就会引起**冲突**
于是js采用单线程的运行机制

> 备注: 为了利用多核CPU的计算能力，HTML5提出Web Worker标准，允许JavaScript 创建多个线程，但是子线程完全受主线程控制，且不得操作DOM。
所以该标准并没有改变js单线程的本质;
</details>



## 1.5. 事件循环中的两种任务？

<details>
<summary>click here</summary>
- 宏任务: 整体代码，setTimeout, setInterval, I/O事件(node中);<br/>
- 微任务: new Promise().then, MutationObserver(事件回溯);
</details>




## 1.6. 为什么引入微任务？只有宏任务可以么？

<details>
<summary>click here</summary>
不行，因为在js的执行过程中，所有的宏任务都是保持着先进先出的原则在执行，这种时候我们无法控制某个位置添加到事件队列的准确位置，所以引入微任务来处理一些高优先级的任务；
</details>









## 1.7. 运行机制？

1. 所有**同步任务都在主线程**上执行，形成一个执行栈；
2. 主线程之外，还存在一个 “任务队列”。 只要异步任务有了结果，就在任务队列放置一个事件；
3. 一旦执行栈的同步任务执行完毕，主线程就会读取 “任务队列” ，异步任务就结束等待状态，进入执行站，开始执行；
4. 循环以上三个步骤；


主线程从 “任务队列” 读取任务的这个过程是源源不断的，所有这个过程称为event Loop


<img src="http://www.ruanyifeng.com/blogimg/asset/2014/bg2014100802.png">



## 1.8. 你了解node中的时间循环么？

<details>
<summary>click here</summary>

宏任务的执行顺序

1. timers定时器: 执行已经安排的setTimeout 和setTimeInterval 的回调函数;
2. pending callback 待定回调: 执行延迟到下一个循环迭代的I/O回调；
3. idle, prepare: 进系统内部使用；
4. poll 轮询: 检索新的I/O事件，执行与I/O 相关的回调；
5. check, 执行setImmediate() 回调函数;
6. close callback: socket.on('close', ()=>{})

</details>


## 1.9. 宏任务和微任务在node中的执行顺序

<details>
<summary>click here</summary>
以node版本v10为界限，

v10及之前的执行顺序是
1. 执行完一个阶段中的所有任务
2. 执行nextTick队列里的内容
3. 执行完微任务队列的内容

v10之后，和浏览器的行为统一了

</details>


# 2. 题目: 打印顺序及分析?

##  2.1. 题目一

```js
async function async1() {
  console.log(1);
  const res = await async2();
  console.log(3);
}

async function async2() {
  console.log(2);
}

Promise.resolve().then(() => {
  console.log(4);
});

setTimeout(() => {
  console.log(5);
});

async1();
console.log(6);
```

## 2.2. 题目二

```js
console.log("start");
setTimeout(() => {
  console.log("children2");
  Promise.resolve().then(() => {
    console.log("children3");
  });
  Promise.resolve().then(() => {
    console.log("children33333");
  });
}, 0);

new Promise(function (resolve, reject) {
  console.log("children4");
  setTimeout(() => {
    console.log("children5");
    resolve("children6");
  }, 0);
}).then((res) => {
  console.log("children7");
  setTimeout(() => {
    console.log(res);
  }, 0);
});



```



## 2.3. 题目三


```js
const p = function () {
  return new Promise((resolve, reject) => {
    const p1 = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(1);
      }, 0);
      resolve(2);
    });
    p1.then((res) => {
      console.log(res);
    });
    console.log(3);
    resolve(4);
  });
};

p().then((res) => {
  console.log(res);
});

console.log("end");
```
