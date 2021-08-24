

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



















## Promise.prototype.catch 返回值

其实相当于 **Promise.prototype.then(null, onRejected)**



## Promise.prototype.finally()返回值

`let p1 = Promise.resolve('foo')`

<details>
<summary style="font-weight: 600;">Promise.prototype.finally()返回值有三种情况</summary>

Promise.prototype.finally()于给函数添加onFinally 处理程序，被设计为与状态无关的函数，无论onResolve还是onRejected该方法都会被执行，避免在 then 和catch中处理冗余的逻辑。


1. 绝大多数情况下，Promise.prototype.finally() 都表现为父期约的传递





```js
p1.finally(()=> 'bbb')
p1.finally(()=> undefined)
p1.finally()
p1.finally(()=> Promise.resolve('ccc'))
p1.finally(()=> Promise.reject('ccc'))
p1.finally(()=> { return Error('出错啦！')})
```




2. 如果返回的是一个 pending 状态的 期约，则保留状态。


```js
p1.finally(()=> new Promise());           // Promise {<pending>}
```


3. 如果抛出错误 或 返回一个 rejected 状态的promise, 则返回 reject 状态


```js
p1.finally(()=> Promise.reject('baz'));             // Promise {<rejected>: "baz"}
p1.finally(()=> { throw new Error('throw error')}); // Promise {<rejected>: Error: throw error
```



</details>


<hr/>



## 期约连锁与期约合成

期约连锁，一个期约接一个的期约
期约合成，将多个期约合成一个期约

### 期约连锁

即利用promise的thenable, 串行化执行异步任务


### 期约合成

<details>
<summary> Promise.all</summary>

Promise.all() 静态方法创建的期约会在一组期约全部解决之后再解决。这个静态方法接收一个可迭代对象，返回一个新的期约。


参数的三种情况

1. 传入常量数组,可迭代对象中的数组会通过 Promise.resolve() 转换为期约。

```js
Promise.all([3,4]) // Promise {<fulfilled>: Array(2)}
```

2. 传入空的可迭代对象，相当于Promise.resove()

```js
Promise.all([]) // Promise {<fulfilled>: Array(0)}
```

3. 什么也不传，会报错

```js
Promise.all() // Promise {<rejected>: TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator))
```


4. 如果有期约拒绝，则第一个拒绝的期约的会将自己的理由作为合成期约的理由，之后再拒绝的期约，不会影响最终期约的拒绝理由。

```js
Promise.all([
   Promise.resolve('我是老大'),
   Promise.reject('我是老二'),
   Promise.resolve('我是老三'),
])
//  Promise {<rejected>: "我是老二"}
```



</details>



<details>
<summary>Promise.race()</summary>
Promise.race() 返回一个包装期约，是一组期约中最先解决/或拒绝的期约的镜像，这个方法接受一个可迭代对象，返回一个新的期约。
</details>



<details>
<summary>⭐️ 串行期约的合成() </summary>
基于后续期约使用之前期约的返回值来串联期约是期约的基本功能，所以我们可以利用该特性，结合reduce函数来实现串行合成。


```js
function addTwo(x) {
  return x + 2;
}
function addThree(x) {
  return x + 3;
}
function addFive(x) {
  return x + 5;
}



function componse(...fn) {
  return (x) =>
    fn.reduce((tolPromise, fn) => tolPromise.then(fn), Promise.resolve(x));
}

const addTen = componse(addTwo, addThree, addFive);

addTen(8).then((res) => {
  console.log(res);
});

```
</details>




<style>
  .details {
    margin-top: 10px;
  }
</style>



## 期约扩展


<details>
<summary>期约取消</summary>

</details>