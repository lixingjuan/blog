# 实现一个遵循Promise/A+ 规范的Promise

1. 一个promise必须具备三种状态(pending|fulfilled(resolved)|rejected)，当处于pending状态时，可以转移到fulfilled(resolved)状态或rejected状态，处于fulfilled(resolved)状态或rejected状态时，状态不再可变
2. 一个promise必须有then方法，then方法必须接受两个参数;
3.  then方法必须返回一个promise

```javascript
class MyPromise {
  constructor(executor) {
    // 初始化状态
    this.state = "pending";
    // 成功的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放的数组
    this.onRejectedCallbacks = [];
    let resolve = value => {
      // 状态改变，resolve调用就会失败
      if (this.state === "pending") {
        // resolve调用成功后，状态
        this.state = "fulfilled";
        this.value = value;
      }
    };
    let reject = value => {
      if (this.state === "pending") {
        this.state = "rejected";
        this.value = value;
      }
    };
    // 如果执行exector出错直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    // 声明返回的promise2
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.state === "fulfilled") {
        let x = onFulfilled(this.value);
        // resovePromise函数，处理自己return的promise和默认的promise2的关系
        resolvePromise(promise2, x, resolve, reject);
        // onFulfilled(this.value)
      }
      if (this.state === "rejected") {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, this.resolve, reject);
      }
      // 当状态state为pending
      if (this.state === "pending") {
        this.onResolvedCallbacks.push(() => {
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
        });
      }
    });
    // 返回promise，完成链式
    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 循环引用报错
  if (x === promise2) {
    // reject报错
    return reject(new TypeError("Chaining cycle detected for promise"));
  }
  // 防止多次调用
  let called;
  // x不是null，且x 是对象或者函数
  if (x != null && (typeof x === "object" || typeof x === "function")) {
    try {
      let then = x.then;
      // 如果then是函数，就默认是promise
      if (typeof then === "function") {
        // 就让then执行 第一个参数是this 后面是成功的回调 和 失败的回调
        then.call(
          x,
          y => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            // resolve 的结果依旧是promise 那就是继续解析
            resolvePromise(promise2, y, resolve, reject);
          },
          err => {
            // 成功和失败只能调用一个
            if (called) return;
            called = true;
            reject(err);
          }
        );
      }
    } catch (e) {
      if (called) return;
      called = true;
      // 取then出错了就不要继续执行了
      reject(e);
    }
  } else {
    resolve(x);
  }
}

const a = new MyPromise(() => {
  console.log(111);
});


```


## 简易版



```js
 
class MyPromise {
  constructor(executor) {
    this.value = undefined;
    this.reason = undefined;
    this.status = "pending"; // 默认promise状态是pending

    let resolve = value => {
      if (this.status === "pending") {
        // 保证状态一旦变更，不能再次修改
        this.value = value;
        this.status = "resolved"; // 成功状态
      }
    };

    let reject = reason => {
      if (this.status === "pending") {
        this.reason = reason;
        this.status = "rejected"; // 失败状态
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise(executorThen => {
      if (this.status === "resolved") {
        setTimeout(() => {
          onFulfilled(this.value);
        }, 0);
      }
      if (this.status === "rejected") {
        setTimeout(() => {
          onRejected(this.reason);
        }, 0);
      }
      if (this.status === "pending") {
        try {
          // 链式调用有点问题
          executorThen(this.resolve, this.reject);
        } catch (error) {
          this.reject(error);
        }
      }
    });
  }
}

```


测试

```js
let p = new MyPromise(function(resolve, reject) {
  console.log("start");
  resolve("data1");
});

p.then(
  v => {
    console.log("success " + v);
  },
  v => {
    console.log("error " + v);
  }
);
console.log("end");
```