## Promise对象 ⭐
### 基本记忆点
- 作用：异步编程的解决方案，可理解为一个容器，里面保存着未来才会技术的事情的一个结果（通常是一个异步操作）；
- 异步定义：一个过程是非连续的完成的，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段；
- 特点一：对象的状态不受外界影响————只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态；
- 特点二：一旦状态改变，就不会再变；
- 特点三：新建后即无法取消；
- Promise三种状态：pending、resolved、rejected;
### 基本用法

## 目标:⭐
- 理解 Promise 原理，能手动实现 Promise 源码;
- 弄懂 Generator 是如何实现异步编程的，即 Promise 与 Generator 与 async 之间的关系;
- 掌握co的实现方式，能自己实现 co ( Generator 函数的自动执行 ) 的代码;

## 💚 Promise对象
### 基本记忆点
- 类型：函数；
- 作用：异步编程的解决方案，可理解为一个容器，里面保存着未来才会技术的事情的一个结果（通常是一个异步操作）；
- 异步定义：一个过程是非连续的完成的，先执行第一段，然后转而执行其他任务，等做好了准备，再回过头执行第二段；
- 特点一：对象的状态不受外界影响————只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态；
- 特点二：一旦状态改变，就不会再变；
- 特点三：新建后即无法取消；
- Promise三种状态：pending、resolved、rejected;
### promise.then(onFulfilled, onRejected)
- 参数要求：可选参数，若非函数必须被忽略；
- 调用时机：必须被作为函数调用（即没有 this 值）；
- 返回：then 方法必须返回一个 promise 对象,所以then方法支持链式；
### 基本用法
### Promise的方法们
- Promise.all():
    - 作用：将多个Promise实例包装成一个新的Promise实例；
    - 使用举例：`const p = Promise.all([p1, p2, p3]);`
    - 参数：一个具有Iterater接口的数据结构（p1, p2, p3都是promise的实例，若不是，就先调用Promise.resolve方法将参数转为Promise实例在进一步处理）
    - 特征：p1, p2, p3全resolved时p才resolved，有一个rejected p就rejected
- Promise.race():
    - 作用：同all()——————>将多个Promise实例包装成一个新的Promise实例；
    - 区别：p1, p2, p3有一个实例率先改变状态，p的状态就跟着改变
- Promise.reject():
    - 作用：返回一个新的 Promise 实例，该实例的状态为rejected,其参数作为后续方法的参数；
- Promise.resolve():
    - 作用：返回一个新的 Promise 实例，该实例的状态为resolved,其参数作为后续方法的参数；
- Promise.prototype.then():
    - 作用：为 Promise 实例添加状态改变时的回调函数。
    - 返回：返回的是一个新的Promise实例；
- Promise.prototype.catch():
    - 作用：用于指定发生错误时的回调函数，方法是.then(null, rejection)或.then(undefined, rejection)的别名。
- Promise.ptototype.finally():
    - 作用：指定不管 Promise 对象最后状态如何，都会执行的操作。

### Promise的红绿灯问题
- 红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次
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
### Promise 实现原理 
```javascript
function Promise2(fn) {
    var state = 'pending';
    var value = null,
        callbacks = [];
    // onFulfilled 就是then小括号里面的函数，把异步操作成功时要执行的函数放进callbacks队列
    this.then = function (onFulfilled) {
        if (state = 'pending') {
            callbacks.push(onFulfilled);
            return this;
        }

    }

    //参数value就是传递给Promise2的实例 
    function resolve(value) {
        state = 'fulfilled';
        execute()
    }
    //
    function reject(value) {
        state = 'rejected';
    }
    function execute() {
        //setTimeout是为了避免Promise内部的函数是同步函数，通过setTimeout机制，将js放在任务执行的队尾
        setTimeout(function () {
            callbacks.forEach(function (callback) {
                callback(value);
            }, 0);
        })
    }

    fn(resolve, reject);
}
```
- 构造函数Promise，接受一个函数fn作为参数，内部定义一个方法then和两个函数resolve和rejecte函数，用于在不同的状态下调用,callbacks存放任务队列。
### Promise实现Ajax
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

