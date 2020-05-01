```javascript

/*
 * @version: 0.0.1
 * @Author: lixingjuan <xingjuan.li@hand-china.com>
 * @Date: 2020-02-02 08:40:56
 * @copyright: Copyright (c) 2019, Hand
 */
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