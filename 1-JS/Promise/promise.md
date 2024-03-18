## 解释一下什么是Promise?

- Promise是javascript中处理异步操作的一个对象，他代表了一个最终可能成功或失败的操作及其结果值。
- Promise共有三种状态：pending、fulfilled、rejected, 状态可以从pending到fulfilled，也可以从pending到rejected，状态一旦改变则不会再变

## Promise解决了什么问题？

1. 回调地狱，之前异步编程主要是采用回调函数完成，当逻辑复杂的时候嵌套容易较深、难以维护难以理解，而Promise.then, 通过返回一个新的Promise, 支持了链式调用，使得异步函数的编写接近于同步的方式，更加符合人类的思维方式。
2. 信任问题，回调函数调用的方式，如果我们控制权交给第三方（其他函数或者库），可能存在信任问题：我们的回调函数调用过早、过晚、调用此时、不调用等诸多问题，但是Promise的特征：
   1. 一旦启用无法停止，一定会调用
   2. 状态一旦改变则不会再变
   3. 单一值，成功的值或者拒绝的理由
3. 透明的错误处理，.then的参数二允许捕获上一个tick的错误，另外，.catch方法允许捕获之前的所有错误
4. 异步操作的组合和控制：Promise的几个静态方法，Promise.all, Promise.race, Promise.any, Promise.allSettled等方法，允许我们用简洁的声明式语法，处理诸多异步场景。比如：两个异步均成功返回才执行下一步，两个异步函数只要有一个成功返回才执行下一步。而这些逻辑如果使用回调函数实现，则非常负责。


## 错误处理trycatch和Promise中错误处理的区别

1. try{}catch(err){}, 只能捕获同步代码中的错误，而异步代码、settimeout中的错误无法捕获
2. trycatch只能捕获try中包裹的错误，而Promise中，错误会一直向下传递，直到遇到catch


## 下面代码的执行结果并解释执行顺序

```js
Promise.resolve()
  .then(() => {
    console.log("then1");
    Promise.resolve().then(() => {
      console.log("then1-1");
    });
  })
  .then(() => {
    console.log("then2");
  });
```

1. Promise.resolve 创建了一个立即解决的Promise,
2. 注册了then, 加入微任务队列，接着又注册了一个then, 加入微任务队列，当前执行栈执行完毕，
3. 当前执行栈执行完毕后，立即执行微任务队列的任务，处理第一个then, 打印then1, Promise.resolve,创建了一个立即解决的Promise, 将注册的then加入微任务队列中，第一个then执行完毕。
4. 从微任务队列中取出下一个then, 打印then2
5. 从微任务队列中取出下一个then，打印then1-1


## 实现一个超时取消的函数
## 实现一个超时重传的函数

<a href="./Promise超时重传.js"></a>

## 实现并发