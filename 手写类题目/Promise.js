class HD {
  static PENDING = "pending";
  static FULFILLED = "fulfilled";
  static REJECTED = "rejected";

  constructor(executor) {
    this.status = HD.PENDING;
    this.value = undefined;
    // callback 是为了解决：
    // 如果new Promise的executor中有定时器，那状态在设定的时间之后才会改变，此时走到then, 没有匹配的条件，
    // 所以先将回调函数存储起来，等状态改变再处理
    this.callback = [];

    executor(this.resolve.bind(this), this.reject.bind(this));
  }

  resolve(val) {
    if (this.status === HD.PENDING) {
      this.value = val;
      this.status = HD.FULFILLED;
      setTimeout(() => {
        this.callback.forEach((cb) => {
          cb.onFulfilled(this.value);
        });
      }, 0);
    }
  }

  reject(val) {
    if (this.status === HD.PENDING) {
      this.value = val;
      this.status = HD.REJECTED;
      setTimeout(() => {
        this.callback.forEach((cb) => {
          cb.onRejected(this.value);
        });
      }, 0);
    }
  }

  then(onFulfilled, onRejected) {
    if (typeof onFulfilled !== "function") {
      onFulfilled = () => this.value;
    }
    if (typeof onRejected !== "function") {
      onRejected = () => this.value;
    }

    return new HD((resolve, reject) => {
      if (this.status === HD.PENDING) {
        this.callback.push({
          onFulfilled: (val) => {
            try {
              let res = onFulfilled(val);
              this.parse(res, resolve, reject);
            } catch (error) {
              reject(error);
            }
          },
          onRejected: (val) => {
            try {
              let res = onRejected(val);
              this.parse(res, resolve, reject);
            } catch (error) {
              reject(error);
            }
          },
        });
      }

      if (this.status === HD.FULFILLED) {
        setTimeout(() => {
          try {
            let res = onFulfilled(this.value);
            this.parse(res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }

      if (this.status === HD.REJECTED) {
        setTimeout(() => {
          try {
            let res = onRejected(this.value);
            this.parse(res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  parse(result, resolve, reject) {
    // 对返回值进行解包，如果是普通值直接返回，如果是promise, 获取到value并返回
    if (result instanceof HD) {
      result.then(resolve, reject);
    } else {
      resolve(result);
    }
  }

  static resolve(val) {
    return new HD((resolve, reject) => {
      if (val instanceof HD) {
        val.then(resolve, reject);
      } else {
        resolve(val);
      }
    });
  }

  static reject(val) {
    return new HD((resolve, reject) => {
      if (val instanceof HD) {
        val.then(resolve, reject);
      } else {
        reject(val);
      }
    });
  }

  static all(arr) {
    return new HD((resolve, reject) => {
      let count = 0;
      let result = [];
      arr.forEach((fn, index) => {
        fn.then(
          (res) => {
            result[index] = res;
            while (++count === arr.length) {
              resolve(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }

  static race(arr) {
    return new HD((resolve, reject) => {
      arr.forEach((fn) => {
        fn.then(
          (res) => {
            resolve(res);
          },
          (err) => {
            reject(err);
          }
        );
      });
    });
  }
}

let RPromise = Promise;
RPromise = HD;

let p1 = new RPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("p1");
  }, 2000);
});
let p2 = new RPromise((resolve, reject) => {
  setTimeout(() => {
    reject("p2");
  }, 1000);
});

RPromise.race([p1, p2]).then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
