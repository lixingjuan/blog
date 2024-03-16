const PENDING = "pending";
const FULFILLED = "fulfilled";
const REJECTED = "rejected";

/**
 * @desc 用来处理当前Promise和then准备return的Promise(记为promise2)之间的关系
 * @param {Promise} promise2 then准备return的promise
 * @param {*} x onFulfilled函数的返回
 * @param {function} resolve 用来改变准备return的promise状态
 * @param {function} reject 用来改变准备return的promise状态
 *
 */
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  if ((typeof x === "object" && x !== null) || typeof x === "function") {
    let then;
    let called = false; // 防止多次调用

    try {
      then = x.then; // 尝试取x.then
      if (typeof then === "function") {
        // 如果then是函数，尝试调用x.then
        then.call(
          x,
          (y) => {
            if (called) return;
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            if (called) return;
            called = true;
            reject(r);
          }
        );
      } else {
        // then不是函数，以x为值解决promise2
        resolve(x);
      }
    } catch (error) {
      // 捕获访问x.then和调用x.then时抛出的错误
      if (called) return;
      reject(error);
    }
  } else {
    resolve(x);
  }
}

class MyPromise {
  constructor(executor) {
    this.state = PENDING;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const onFulfilled = (val) => {
      if (this.state === PENDING) {
        this.state = FULFILLED;
        this.value = val;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const onRejected = (reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(onFulfilled, onRejected);
    } catch (error) {
      onRejected(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    const promise2 = new MyPromise((resolve, reject) => {
      switch (this.state) {
        case FULFILLED: {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        }

        case REJECTED: {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
          break;
        }

        case PENDING: {
          // 不论Promise是如何解决或拒绝的，其“then方法的回调函数，总是需要在javascript事件循环的当前运行栈完成后，异步执行”
          this.onFulfilledCallbacks.push(() => {
            setTimeout(() => {
              try {
                const x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });

          this.onRejectedCallbacks.push(() => {
            setTimeout(() => {
              try {
                let x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              } catch (error) {
                reject(error);
              }
            }, 0);
          });

          break;
        }

        default:
          console.log("异常");
          break;
      }
    });
    return promise2;
  }
}

// export default MyPromise;
module.exports = MyPromise;
