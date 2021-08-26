

# Promise与异步函数

## Promise历史

**期约**是对尚不存在的一个结果的替身。早期的期约机制是在Jquery和Dojo中以Derferred API 出现的。后来2010年，common.js实现的Promises/A规范逐渐流行起来。Q和BlueBird实现的javascript 第三方库也逐渐得到社区的认可，但是这些库的实现都多少有些不同。2012年，Promises/A+规范fork 了common.js的 Promises/A 建议，并以相同的名字制定了Promises/A+规范，这个规范也最终成为了ES6规范实现的版本。

ECMAScript 6增加了对Promises/A+规范的完善支持，即Promise类型，成为了主导性的异步编程方案，





## Promises/A+规范


Promise的特点

1. Promise有三个状态，pending, fulfilled, rejected
2. 状态改变后不可再次改变(判断如果已经处于fulfilled, rejected，则不可再次切换其状态)
3. 可以使用new 操作符进行实例化(不能用箭头函数实现)
4. 可以直接通过调用 Promise.resolve()或者Promise.reject() 方法返回 fulfilled/rejected 状态的 Promise
5. 具有thanable 接口 (Promise 的 prototype 上需要有 then方法)
6. then 方法接受两个处理程序，onResolved, onRejcted, 分别对应Promise 状态变为 fulfilled/rejected 时进行调用




## Promise.then的返回值


<details>
<summary style="font-weight: 600;">resolve状态，then不同处理的返回</summary>

在不同状态下，Promise.then的返回值不同

`let p1 = Promise.resolve('foo')`


1. 如果调用then的时候不传处理程序，则原样向后传;

`const p2 = p1.then(); // Promise {<fulfilled>: "foo"}`


2. 如果没有显式的返回，则Promise.resolve()会包装默认的返回值undefined;

```js
p1.then(()=>{});                // Promise {<fulfilled>: undefined}
p1.then(()=> undefined);        // Promise {<fulfilled>: undefined}
p1.then(()=>Promise.resolve()); // Promise {<fulfilled>: undefined}
```


3. 如果有显式的返回，则Promise.resove() 会包装这个值

```js
p1.then(()=>'a');                   // Promise {<fulfilled>: "a"}
p1.then(()=> Promise.resolve('a')); // Promise {<fulfilled>: "a"}
```

4. 保留返回的promise

```js
p1.then(()=> new Promise(()=>{}));    // Promise {<pending>}
p1.then(()=> Promise.reject());       // Promise {<rejected>: undefined}
```


5. 如果抛出异常会返回拒绝状态的Promise

```js
p1.then(()=> {throw '出错了'})          // Promise {<rejected>: "出错了"}
```

6. 如果返回错误值，会用Promise.resolve 将该错误值进行包装

```js
p1.then(()=> { return Error('出错了')}) // Promise {<fulfilled>: Error: 出错了
```

</details>


<details style="margin-top: 30px;">
<summary style="font-weight: 600;">reject状态，then不同处理的返回</summary>

onRejected处理程序也与之有点类似: onRejected的返回值也会被Promise.resolve()包装，乍一看会感觉有点违反直觉，但是想一想，onRejected处理程序不就是为了捕获异常么？因此，onRejected处理程序在捕获异常后不抛出异常是符合期约的行为。

`let p1 = Promise.reject('foo')`


1. 如果调用then的时候不传处理程序，则原样向后传;

`p1.then(); // Promise {<rejected>: "foo"}`



2. 如果没有显式的返回，则Promise.resolve()会包装默认的返回值undefined;

```js
p1.then(null, ()=>{});                // Promise {<rejected>: "foo"}
p1.then(null, ()=> undefined);        // Promise {<rejected>: "foo"}
p1.then(null, ()=>Promise.resolve()); // Promise {<rejected>: "foo"}
```


3. 如果有显式的返回，则Promise.resove() 会包装这个值

```js
p1.then(null, ()=>'a');                   // Promise {<fulfilled>: "a"}
p1.then(null, ()=> Promise.resolve('a')); // Promise {<fulfilled>: "a"}
```

4. 保留返回的promise

```js
p1.then(null, ()=> new Promise(()=>{}));    // Promise {<pending>}
p1.then(null, ()=> Promise.reject());       // Promise {<rejected>: undefined}
p1.then(null, ()=> Promise.resolve());      // Promise {<fulfilled>: undefined}
```


5. 抛出异常: 会返回拒绝状态的Promise

```js
p1.then(null, ()=> {throw '出错了'})          // Promise {<rejected>: "出错了"}
```

1. 返回错误值: 会用Promise.resolve 将该错误值进行包装

```js
p1.then(()=> { return Error('出错了')}) // Promise {<fulfilled>: Error: 出错了
```



</details>
























## Promise.prototype.catch

其实相当于 **Promise.prototype.then(null, onRejected)**



## Promise.prototype.finally()

`let p1 = Promise.resolve('foo')`

<details>
<summary style="font-weight: 600;">Promise.prototype.finally()返回值有几种情况？</summary>

Promise.prototype.finally()于给函数添加onFinally 处理程序，被设计为与状态无关的函数，无论onResolve还是onRejected该方法都会被执行，避免在 then 和catch中处理冗余的逻辑。

绝大多数情况下，Promise.prototype.finally() 都表现为父期约的传递





```js
p1.finally(()=> 'bbb')
p1.finally(()=> undefined)
p1.finally()
p1.finally(()=> Promise.resolve('ccc'))
p1.finally(()=> Promise.reject('ccc'))
p1.finally(()=> { return Error('出错啦！')})
```




1. 如果返回的是一个 pending 状态的 期约，则保留状态。

```js
p1.finally(()=> new Promise());           // Promise {<pending>}
```


3. 如果抛出错误 或 返回一个 rejected 状态的promise, 则


```js
p1.finally(()=> Promise.reject('baz'));             // Promise {<rejected>: "baz"}
p1.finally(()=> { throw new Error('throw error')}); // Promise {<rejected>: Error: throw error
```


</details>



## Promise

promise的提出解决了以下两个问题:

1. 回调地狱 -- 一个函数总是依赖于另一个函数的结果
2. 使代码扁平化

```JavaScript
// 回调函数举例
doSomething(){
    ...
    doSomething2(){
        ...
        doSomething3(){
          ...
        }
    }
}

// promise 写法
doSomething(){...}
  .then(()=>{...})
  .then(()=>{...})
```




# promise的方法

## .then()

promise.then(onFulfilled, onRejected)

为什么promise 可以使用then方法呢？
因为promise返回一个新的promise

拓展:
日常开发如何实现级联？

```js
const demo = {
  value: 0,
  add1: function() {
    console.log((this.value = this.value + 1));
    return this;
  },
  sub1: function() {
    console.log((this.value = this.value - 1));
    return this;
  }
};

demo
  .add1()
  .add1()
  .sub1()
  .sub1()
```

## 特点

1. promise的状态只有一次改变机会，有且只有异步操作的结果决定当前是哪一种状态,任何其他操作都无法改变这个状态，状态一旦改变就不会再变；

```JavaScript
const promise = new Promise((resolve,reject)=>{
  // resolve('success1')
  setTimeout(()=>{
    return 'success1'
  },1000)
	reject('error')
	resolve('success2')
})
promise.then((res)=>{
	console.log('成功',res)
},(err)=>{
	console.log('失败',err)
})
```

2. .then .catch中 return一个 Error对象,并不会抛出错误，所以并不会被后续的.catch捕获，因为返回任意一个非 promise 的值都会被包裹成 promise 对象；

```javascript
const promise1 = new Promise((resolve,reject)=>{
	resolve('success')
})
Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })

// 打印结果
// then:  Error: error!!!
```


3. Promise只能执行一次，但是then/catch都可以多次调用，且每次调用都能立即拿到promise内部返回值

```JavaScript
const promise1 = new Promise((resolve,reject)=>{
	resolve('success')
})
const promise2 = new Promise((resolve,reject)=>{
	reject('error')
})
promise1.then((res)=>{
	console.log(res)
} // success
promise1.then((res)=>{
	console.log(res)
} // success
promise1.catch((res)=>{
	console.log(res)
} // error
```

## 方法

1. Promise.all():

作用：将多个Promise实例包装成一个新的Promise实例；
使用举例：`const p = Promise.all([p1, p2, p3]);`
参数：一个具有Iterater接口的数据结构（p1, p2, p3都是promise的实例，若不是，就先调用Promise.resolve方法将参数转为Promise实例在进一步处理）
特征：p1, p2, p3全resolved时p才resolved，有一个rejected p就rejected


2. Promise.allSettled()

该方法接受一组Promise, 并且返回所有的结果，而不管是resolve还是 rejected
只会运行所有的Promise, 而不关心他们的结果

```js
let myPromiseArray = [
  Promise.resolve(100),
  Promise.reject(null),
  Promise.resolve(new Error("oh bo")),
];

Promise.allSettled(myPromiseArray)
  .then((res) => {
    console.log(res);
  })

/* node 环境的打印如下，但是浏览器的打印是一个fulfilled状态，没有返回值的Promise */
//  [
//    { status: 'fulfilled', value: 100 },
//    { status: 'rejected', reason: null },
//    {
//      status: 'fulfilled',
//      value: Error: oh bo
//          at Object.<anonymous> (/Users/xingjuan.li/Documents/git-code/Blog/source/_posts/🍓前端知识分类/JS相关类/del.js:18:19)
//          at Module._compile (internal/modules/cjs/loader.js:1251:30)
//          at Object.Module._extensions..js (internal/modules/cjs/loader.js:1272:10)
//          at Module.load (internal/modules/cjs/loader.js:1100:32)
//          at Function.Module._load (internal/modules/cjs/loader.js:962:14)
//          at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
//          at internal/main/run_main_module.js:17:47
//    }
//  ]
```

3. Promise.race():

作用：同all()——————>将多个Promise实例包装成一个新的Promise实例；
区别：p1, p2, p3有一个实例率先改变状态，p的状态就跟着改变


3. Promise.reject():
作用：返回一个新的 Promise 实例，该实例的状态为rejected,其参数作为后续方法的参数；


4. Promise.resolve():
作用：返回一个新的 Promise 实例，该实例的状态为resolved,其参数作为后续方法的参数；


5. Promise.prototype.then():
作用：为 Promise 实例添加状态改变时的回调函数。
返回：返回的是一个新的Promise实例；


6. Promise.prototype.catch():
作用：用于指定发生错误时的回调函数，方法是.then(null, rejection)或.then(undefined, rejection)的别名。


7. Promise.ptototype.finally():
作用：指定不管 Promise 对象最后状态如何，都会执行的操作。









## Promise实现Ajax


```javascript
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject){
    const handler = function() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      } else {
        reject(new Error(this.statusText));
      }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();

  });

  return promise;
};

getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});

```

## 红绿灯问题

红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次


```javascript
function red() {
    console.log('red')
}
function green() {
    console.log('green')
}
function yellow() {
    console.log('yellow')
}
var light = function (timmer, cb) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            cb()
            resolve()
        }, timmer)
    })
}
var step = function () {
    Promise.resolve().then(function () {
        return light(3000, red)
    }).then(function(){
        return light(1000,green)
    }).then(function(){
        return light(2000,yellow)
    })
}
step()
```


## 手写promise

见 => Promise手写.md


### Promise 实现原理


```javascript
function Promise2(fn) {
  var state = "pending";
  var value = null,
    callbacks = [];
  // onFulfilled 就是then小括号里面的函数，把异步操作成功时要执行的函数放进callbacks队列
  this.then = function(onFulfilled) {
    if ((state = "pending")) {
      callbacks.push(onFulfilled);
      return this;
    }
  };

  // 参数value就是传递给Promise2的实例
  function resolve(value) {
    state = "fulfilled";
    execute();
  }
  //
  function reject(value) {
    state = "rejected";
  }
  function execute() {
    // setTimeout是为了避免Promise内部的函数是同步函数，通过setTimeout机制，将js放在任务执行的队尾
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        callback(value);
      }, 0);
    });
  }

  fn(resolve, reject);
}
```

构造函数Promise，接受一个函数fn作为参数，内部定义一个方法then和两个函数resolve和rejecte函数，用于在不同的状态下调用,callbacks存放任务队列。

# 相关文章

1. [Promise 必知必会（十道题）](https://juejin.im/post/6844903509934997511)