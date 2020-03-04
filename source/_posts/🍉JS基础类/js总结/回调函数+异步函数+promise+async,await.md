## 相关文章
- 阮一峰ES6： http://es6.ruanyifeng.com/#docs/promise
- 阮一峰Javascript异步编程的4种方法：https://www.ruanyifeng.com/blog/2012/12/asynchronous＿javascript.html
- 一次性让你懂async/await，解决回调地狱 - https://juejin.im/post/5b1ffff96fb9a01e345ba704
- ES6 系列之我们来聊聊 Promise- https://github.com/mqyqingfeng/Blog/issues/98
- 浏览器进程？线程？傻傻分不清楚！- https://imweb.io/topic/58e3bfa845e5c13468f567d5
- Promise 必知必会（十道题）- https://juejin.im/post/5a04066351882517c416715d#heading-4
- 手写Promise - https://juejin.im/post/5b2f02cd5188252b937548ab

1. Javascript语言的执行环境是"单线程",也就是说，一次只能执行一件事情，其他的事情必须要排队，前一个任务完成，再执行后一个任务。  
2. 优点：实现起来比较简单，执行环境相对单纯；  
3. 坏处：只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。常见的浏览器无响应，往往就是因为某一段Javascript代码长时间运行（比如死循环），导致整个页面卡在这个地方，其他任务无法执行；


## 异步函数

### 1. 什么是异步函数？

#### 官方

- 无需等待被调用函数的返回值就继续向下执行的函数；

### 2. js中事件的执行顺序问题

#### 异步函数任务分类
- 同步任务
- 异步任务

#### 精细划分 => 
- 宏任务：IO/setTimeout/serInterval
- 微任务：promise.then(catch/finally)  
- （注：promise是声明立即执行）

#### 执行顺序
- 依次从上向下执行
    - 遇到同步语句 >> 立即执行
    - 遇到宏任务 >> 放在宏任务队列
    - 遇到微任务 >> 放在微任务队列
- 先返回执行同级的微任务
    - 遇到同步语句 >> 立即执行
    - 遇到宏任务 >> 放在宏任务队列
    - 遇到微任务 >> 放在微任务队列
- （同级的微任务队列中没有微任务）再返回执行宏任务
    - 拿出一个宏任务，按照上面的步骤执行即可
！宏任务的队列是全局的
！同级的微任务队列没有微任务时再去查找宏任务队列

#### 举例

> 下面的代码b并不会等事件a完全执行完毕再执行  
> 在延迟函数被触发的过程中就执行了函数b  
> 当js引擎的event 队列空闲时才会去执行队列里等待的setTimeout的回调函数  
> 调用 setTimeout 函数会在一个时间段过去后在队列中添加一个消息。这个时间段作为函数的第二个参数被传入。如果队列中没有其它消息，消息会被马上处理。但是，如果有其它消息，setTimeout 消息必须等待其它消息处理完。因此第二个参数仅仅表示最少的时间 而非确切的时间  

```JavaScript
// eg.1 异步函数执行顺序问题
function a() {
  setTimeout(() => {
    console.log('执行a函数的延迟函数')
  }, 3000)
  console.log('执行a函数')
}
function b() {
  console.log('执行b函数')
}
a();
b();
// 执行a函数
// VM640:8 执行b函数
// undefined
// VM640:3 执行a函数的延迟函数

```

## 回调函数

### 什么是回调函数？

- 一个函数的执行总是依赖另一个函数的执行结果，函数层层嵌套;
- 回调 是编写和处理 JavaScript 程序异步逻辑的最常用方式

```javascript
// ajax(..)是某个库中提供的某个Ajax函数
var data = axios.get( "http://some.url.1" );
// 啊哦！data通常不会包含Ajax结果
console.log( data );

// 回调函数的写法
axios.get( "http://some.url.1" ,(res)=>{
  console.log(res)
})

```

### 举例
- 回调函数与同步、异步没有关系，回调函数只是一种实现方式，既可以有同步回调，也可以有异步回调，也可以有延迟函数回调
- 缺点：不利于代码的阅读和维护，各个部分之间高度耦合
- 把一段代码包装成一个函数，并指定它在响应某个事件（定时器、鼠标点击、Ajax 响应等）时执行

```javascript
// click事件的回调函数
$('div').click(()=>{
    alert(1)
})

// ajax的回调函数
$.get('/del.html',function(data){
    $('.new').html(data);
})

// 回调地狱
fs.readdir(source, function (err, files) {
  if (err) {
    console.log(err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log(err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})
```

## Promise

### promise解决的什么问题?

- 回调地狱：下一个事件的执行总是依赖于他的前一个事件的执行结果,嵌套层数过多，难以维护；
- Promise使代码扁平化


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

### promise特点

#### 1. promise构造函数立即执行，then是异步执行

```JavaScript
const d = new Promise((resolve,reject)=>{
	console.log(1)
  resolve()
})
d.then(()=>{
	console.log(3)
})
console.log(2)
```

#### 2. promise.then() 返回一个新的promise,因此可以实行then链式调用

```JavaScript
const promise1 = new Promise((resolve,reject)=>{
	console.log(1)
  reject()
})
const promise2 = promise1.then(
  ()=>{
	  console.log(2)
  },
  ()=>{
	  console.log(3)
  }
)

console.log(promise1)  
// 打印结果
// Promise {<resolved>: undefined}
// __proto__: Promise
// [[PromiseStatus]]: "rejected"
// [[PromiseValue]]: undefined

console.log(promise2)
// 打印结果
// Promise {<resolved>: undefined}
// __proto__: Promise
// [[PromiseStatus]]: "resolved"
// [[PromiseValue]]: undefined
```

#### 3. promise的状态只有一次改变机会，有且只有异步操作的结果决定当前是哪一种状态,任何其他操作都无法改变这个状态，状态一旦改变就不会再变；


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

#### 4. Promise只能执行一次，但是then/catch都可以多次调用，且每次调用都能立即拿到promise内部返回值

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

#### 5. .then .catch中 return一个 Error对象,并不会抛出错误，所以并不会被后续的.catch捕获
- 因为返回任意一个非 promise 的值都会被包裹成 promise 对象

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


## async/await

### 引出async/await的作用

- generator函数的语法糖，是模拟generator的*和yield
- 解决promise层层then ，使得异步代码写的看起来更像同步事件
- 使用举例: 等待读取文件完成后,再执行console.log打印结果


```javascript
// generator函数语法
function * helloWorldGenerator() {
  yield 'hello';
  yield 'world';
  return 'ending';
}


// then写法
const uglyThen = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 3000);
});

uglyThen
  .then((res) => {
    console.log(res + 1);
    return res + 1;
  })
  .then((res) => {
    console.log(res + 2);
    return res + 1;
  });


const readFile = (url) => {
  return new Promise((resolve, reject) => {
    fs.readFile(url, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data)
      }
    });
  })
}

// await 写法
const beautyAwait = async () => {
  const test1 = await readFile('./source/_posts/test1.md');
  const test2 = await readFile('./source/_posts/test2.md');
  console.log(test1);
  console.log(test2);
};
beautyAwait()
```

### async特点

#### 使用了async的函数为异步函数，只有async内部可以使用await,
- 否则报错`await is only valid in async function`

#### async的函数内部自动返回 Promise 对象（状态为resolve）:

- 若内部手动return, 则返回一个状态为resolve,参数为return值的Promise;
- 若无return, 返回的是一个状态为resolve,参数为undefined的Promise;

```javascript
// 有return
const b = async ()=>{
	console.log(1)
    return 1
}
b()
// 返回值：Promise {<resolved>: 1}

// 无return
const a = async ()=>{
	console.log(1)
}
a()
// 返回值：Promise {<resolved>: undefined}

```

#### async内部执行情况

- 若无await,立即执行，返回一个Promise对象，并且不会阻塞后面的对象 (eg.1)
- 若有await,等待内部所有await都执行完了才返回成功还是失败 (eg.2)

```javascript
const timeout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve();
    }, 3000);
  });
};
// 无await
const test = async () => {
  timeout();
  timeout();
  console.log(2);
};
// 有await
const test2 = async () => {
  await timeout();
  await timeout();
  console.log(2);
};
test();
test2();
```

#### async返回reject的情况

- 内部使用未声明的变量或者函数(eg.1)
- 函数方法使用错误（如，对object使用push）(eg.2)
- 内部手动抛出一个错误`throw new Error` (eg.3)
- return Promise.reject('执行失败') (eg.4)

```javascript
/* eg.1.使用未声明的变量 */
const a = async ()=>{
	console.log(b);
}
a()
// 返回值： Promise {<rejected>: ReferenceError: b is not defined

/* eg.2.方法使用错误 */
const b = async ()=>{
	const c = {name:1}
    c.push(1)
}
b()
// 返回值：Promise {<rejected>: TypeError: c.push is not a function

/* eg.3.手动抛出一个错误 */
const c = async ()=>{
	throw new Error;
}
c()
// 返回值：Promise {<rejected>: Error


/* eg.4.手动return Promise.reject() */
const e = async ()=>{
	return Promise.reject(1);
}
e()
// 返回值：Promise {<rejected>: 1}
```

#### async函数内部一定要return
- 若手动调用reject,一定要return，不然就认为是resolve,且参数为undefined

```JavaScript
// 正确的reject方法。必须将reject状态return出去。
async function PromiseError() {    
   return Promise.reject('有错误');
}
PromiseError()
    .then(success => console.log('成功', success))          
    .catch(error => console.log('失败', error));
    // 打印结果：失败 有错误
    
/*
* 错误的reject方法。必须将reject状态return出去
*/
async function PromiseError() {    
   Promise.reject('有错误');
}
PromiseError()
    .then(success => console.log('成功', success))          
    .catch(error => console.log('失败', error));
    // 打印结果：成功 undefined
```

### await 特点

- await会暂停当前async function的执行，等待其指定的Promsie处理完成
  - 若promise 成功执行(fulfilled)，其回调的resolve()函数的参数作为await表达式的值，继续向下执行async function；
  - 若Promise 执行异常(rejected)，await 表达式会抛出 Promise 的异常原因；
  - 若await 等待的表达式的值不是一个Promise,则返回值本身

- 举例：执行过程:
  - await会等待timeout里面的Promise执行，也就是3秒后将setTimeout内容加入队列
  - 3秒后打印出了1
  - 接着执行console.log(2)

```JavaScript
const timeout = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(1);
      resolve(2);
    }, 3000);
  });
};

const test = async () => {
  const aa = await timeout();
  console.log(aa);
};
test()
  // 3秒后打印
  // 1
  // 2
```



### async函数内部的map内使用await报错await is a reserved word解决方法

- 解决方法

```JavaScript
const arr = []
const generateCodeFun = async (flagArr) => {
+  flagArr.map(async (item) => {
    ...
    return item
  })
}
```

### async/await滥用问题

- js是单线程执行的，也就是一次只能执行一个，所有的异步都是使用同步模拟出来的，这么做的目的就是为了避免由于网络原因造成堵塞，如果一张图片没有请求到，下面不需要网络的函数们也不能加载执行只能干等着，性能非常不好
- 而await的提出又是为了解决同步代码需要他之前的异步代码的结果提出的
- 所以只在需要之前的异步函数的情况下使用await，不然岂不是辜负了设计者的良苦用心

## 浏览器相关
- <a href="https://imweb.io/topic/58e3bfa845e5c13468f567d5">浏览器进程？线程？傻傻分不清楚！</a>