class MyPromise {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = "pending";
    this.value = null;
    this.callback = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  resolve(value) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.FULFILLED;
      this.value = value;
      this.callback.forEach((callback) => callback.onFulfilled(this.value));
    }
  }

  reject(reason) {
    if (this.status === MyPromise.PENDING) {
      this.status = MyPromise.REJECTED;
      this.value = reason;
      this.callback.forEach((callback) => callback.onRejected(this.value));
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }

    let promise = new MyPromise((resolve, reject) => {
      /** 若任务仍未执行 */
      if (this.status === MyPromise.PENDING) {
        this.callback.push({
          onFulfilled: (value) => {
            this.parse(promise, onFulfilled(value), resolve, reject);
          },
          onRejected: (value) => {
            this.parse(promise, onRejected(value), resolve, reject);
          },
        });
      }

      /** 若任务已经执行完成 */
      if (this.status === MyPromise.FULFILLED) {
        setTimeout(() => {
          this.parse(promise, onFulfilled(this.value), resolve, reject);
        });
      }

      /** 若任务已经拒绝 */
      if (this.status === MyPromise.REJECTED) {
        setTimeout(() => {
          this.parse(promise, onRejected(this.value), resolve, reject);
        });
      }
    });

    return promise;
  }

  parse(promise, result, resolve, reject) {
    if (promise === result) {
      throw new TypeError("Chaining cycle detected");
    }
    try {
      if (result instanceof MyPromise) {
        result.then(resolve, reject);
      } else {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  }

  static resolve(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        resolve(value);
      }
    });
  }

  static reject(value) {
    return new MyPromise((resolve, reject) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject);
      } else {
        reject(value);
      }
    });
  }

  static all(thePromises) {
    const values = [];

    return new MyPromise((resolve, reject) => {
      thePromises.forEach((promise) => {
        promise.then(
          (value) => {
            values.push(value);
            if (values.length === thePromises.length) {
              resolve(values);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  static race(thePromises) {
    return new MyPromise((resolve, reject) => {
      thePromises.forEach((promise) => {
        promise.then(
          (value) => {
            resolve(value);
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }
}

/* ****************************************************************************************************
 *                                    测试
 ************************************************************************************************* */
// setTimeout(() => resolve("hello, p1"), 3000);

/**
 * 1. Promise使用new创建实例
 * 2. 参数为函数
 * 3. 参数接收到两个函数，分别为 onResolved, onRejected, 用来切换当前实例的状态
 * */

const p1 = new MyPromise((resolve, reject) => {
  resolve(1);
});
console.log(p1);
const p2 = new MyPromise((resolve, reject) => {
  reject(1);
});
console.log(p2);
