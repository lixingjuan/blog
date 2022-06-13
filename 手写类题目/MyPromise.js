let PENDING = "pending";
let FULFILLED = "fulfilled";
let REJECTED = "rejected";

function resolvePromise(promise, x, resolve, reject) {
  // 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(new TypeError("The promise and the return value are the same"));
  }

  // 如果 x 不为对象或者函数，以 x 为参数执行 promise
  if (typeof x !== "object" && typeof x !== "function") {
    resolve(x);
    return;
  }

  // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
  if (x === null) {
    return resolve(x);
  }

  try {
    // 把 x.then 赋值给 then
    var then = x.then;
  } catch (error) {
    // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
    return reject(error);
  }

  // 如果 then 不是函数，以 x 为参数执行 promise
  if (typeof then !== "function") {
    resolve(x);
    return;
  }

  var called = false;
  // 将 x 作为函数的作用域 this 调用之
  // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
  // 名字重名了，我直接用匿名函数了
  try {
    then.call(
      x,
      // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
      function (y) {
        // 如果 resolvePromise 和 rejectPromise 均被调用，
        // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
        // 实现这条需要前面加一个变量called
        if (called) return;
        called = true;
        resolvePromise(promise, y, resolve, reject);
      },
      // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
      function (r) {
        if (called) return;
        called = true;
        reject(r);
      }
    );
  } catch (error) {
    // 如果调用 then 方法抛出了异常 e：
    // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
    if (called) return;

    // 否则以 e 为据因拒绝 promise
    reject(error);
  }
}

class MyPromise {
  constructor(executor) {
    this.status = "pending";
    this.value = null;
    this.reason = null;

    // 构造函数里面添加两个数组存储成功和失败的回调
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (error) {
      this.reject(error);
    }
  }

  // resolve方法参数是value
  resolve(value) {
    if (this.status === PENDING) {
      this.status = FULFILLED;
      this.value = value;

      // resolve里面将所有成功的回调拿出来执行
      this.onFulfilledCallbacks.forEach((callback) => {
        callback(this.value);
      });
    }
  }

  // reject方法参数是reason
  reject(reason) {
    if (this.status === PENDING) {
      this.status = REJECTED;
      this.reason = reason;

      // resolve里面将所有失败的回调拿出来执行
      this.onRejectedCallbacks.forEach((callback) => {
        callback(this.reason);
      });
    }
  }

  then = function (onFulfilled, onRejected) {
    // 如果onFulfilled不是函数，给一个默认函数，返回value
    // 后面返回新promise的时候也做了onFulfilled的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
    var realOnFulfilled = onFulfilled;
    if (typeof realOnFulfilled !== "function") {
      realOnFulfilled = function (value) {
        return value;
      };
    }

    // 如果onRejected不是函数，给一个默认函数，返回reason的Error
    // 后面返回新promise的时候也做了onRejected的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
    var realOnRejected = onRejected;
    if (typeof realOnRejected !== "function") {
      realOnRejected = function (reason) {
        throw reason;
      };
    }

    var that = this; // 保存一下this

    if (this.status === FULFILLED) {
      var promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(that.value);
            } else {
              var x = realOnFulfilled(that.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });

      return promise2;
    }

    if (this.status === REJECTED) {
      var promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            if (typeof onRejected !== "function") {
              reject(that.reason);
            } else {
              var x = realOnRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });

      return promise2;
    }

    // 如果还是PENDING状态，将回调保存下来
    if (this.status === PENDING) {
      var promise2 = new MyPromise(function (resolve, reject) {
        that.onFulfilledCallbacks.push(function () {
          setTimeout(function () {
            try {
              if (typeof onFulfilled !== "function") {
                resolve(that.value);
              } else {
                var x = realOnFulfilled(that.value);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        that.onRejectedCallbacks.push(function () {
          setTimeout(function () {
            try {
              if (typeof onRejected !== "function") {
                reject(that.reason);
              } else {
                var x = realOnRejected(that.reason);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });

      return promise2;
    }
  };

  then2(theOnFulfilled, theOnRejected) {
    // 如果onFulfilled不是函数，给一个默认函数，返回value
    // 后面返回新promise的时候也做了onFulfilled的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
    var onFulfilled = theOnFulfilled;
    if (typeof onFulfilled !== "function") {
      onFulfilled = function (val) {
        return val;
      };
    }

    // 如果onRejected不是函数，给一个默认函数，返回reason的Error
    // 后面返回新promise的时候也做了onRejected的参数检查，这里可以删除，暂时保留是为了跟规范一一对应，看得更直观
    var onRejected = theOnRejected;
    if (typeof onRejected !== "function") {
      onRejected = function (reason) {
        throw reason;
      };
    }

    /**
     * 两种状态分别处理
     */
    if (this.status === FULFILLED) {
      var promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== "function") {
              resolve(this.value);
            } else {
              var x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });

      return promise2;
    }

    if (this.status === REJECTED) {
      var promise2 = new MyPromise(function (resolve, reject) {
        setTimeout(function () {
          try {
            if (typeof onRejected !== "function") {
              reject(this.reason);
            } else {
              var x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0);
      });

      return promise2;
    }

    if (this.status === PENDING) {
      var promise2 = new MyPromise(function (resolve, reject) {
        this.onFulfilledCallbacks.push(function () {
          setTimeout(function () {
            try {
              if (typeof onFulfilled !== "function") {
                resolve(this.value);
              } else {
                var x = onFulfilled(this.value);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(function () {
          setTimeout(function () {
            try {
              if (typeof onRejected !== "function") {
                reject(this.reason);
              } else {
                var x = onRejected(this.reason);
                resolvePromise(promise2, x, resolve, reject);
              }
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      });

      return promise2;
    }
  }

  static deferred() {
    var result = {};
    result.promise = new MyPromise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });

    return result;
  }

  static resolve = function (parameter) {
    if (parameter instanceof MyPromise) {
      return parameter;
    }

    return new MyPromise(function (resolve) {
      resolve(parameter);
    });
  };

  static reject = function (reason) {
    return new MyPromise(function (resolve, reject) {
      reject(reason);
    });
  };

  static all = function (promiseList) {
    var resPromise = new MyPromise(function (resolve, reject) {
      var count = 0;
      var result = [];
      var length = promiseList.length;

      if (length === 0) {
        return resolve(result);
      }

      promiseList.forEach(function (promise, index) {
        MyPromise.resolve(promise).then(
          function (value) {
            count++;
            result[index] = value;
            if (count === length) {
              resolve(result);
            }
          },
          function (reason) {
            reject(reason);
          }
        );
      });
    });

    return resPromise;
  };

  static race = function (promiseList) {
    return new MyPromise(function (resolve, reject) {
      var length = promiseList.length;

      if (length === 0) {
        return resolve();
      }

      for (var i = 0; i < length; i++) {
        MyPromise.resolve(promiseList[i]).then(
          function (value) {
            return resolve(value);
          },
          function (reason) {
            return reject(reason);
          }
        );
      }
    });
  };

  catch = function (onRejected) {
    this.then(null, onRejected);
  };

  finally = function (fn) {
    return this.then(
      function (value) {
        return MyPromise.resolve(fn()).then(function () {
          return value;
        });
      },
      function (error) {
        return MyPromise.resolve(fn()).then(function () {
          throw error;
        });
      }
    );
  };

  static allSettled = function (promiseList) {
    return new MyPromise(function (resolve) {
      var length = promiseList.length;
      var result = [];
      var count = 0;

      if (length === 0) {
        return resolve(result);
      } else {
        for (var i = 0; i < length; i++) {
          (function (i) {
            var currentPromise = MyPromise.resolve(promiseList[i]);

            currentPromise.then(
              function (value) {
                count++;
                result[i] = {
                  status: "fulfilled",
                  value: value,
                };
                if (count === length) {
                  return resolve(result);
                }
              },
              function (reason) {
                count++;
                result[i] = {
                  status: "rejected",
                  reason: reason,
                };
                if (count === length) {
                  return resolve(result);
                }
              }
            );
          })(i);
        }
      }
    });
  };
}

module.exports = MyPromise;

const a = new MyPromise((resolve, reject) => {
  resolve(1);
});
a.then((res) => {
  console.log("res", res);
});
