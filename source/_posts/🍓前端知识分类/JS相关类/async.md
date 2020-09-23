# async/await

**引出async/await的作用**

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


## async特点

使用了async的函数为异步函数，只有async内部可以使用await

- 否则报错`await is only valid in async function`

## async的函数内部自动返回 Promise 对象（状态为resolve）:

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

## async内部执行情况

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

## async返回reject的情况

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

## async函数内部一定要return
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

## await 特点

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



## async函数内部的map内使用await报错await is a reserved word解决方法

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

## async/await滥用问题

- js是单线程执行的，也就是一次只能执行一个，所有的异步都是使用同步模拟出来的，这么做的目的就是为了避免由于网络原因造成堵塞，如果一张图片没有请求到，下面不需要网络的函数们也不能加载执行只能干等着，性能非常不好
- 而await的提出又是为了解决同步代码需要他之前的异步代码的结果提出的
- 所以只在需要之前的异步函数的情况下使用await，不然岂不是辜负了设计者的良苦用心
