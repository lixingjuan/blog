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
      onFulfilled = () => {};
    }
    if (typeof onRejected !== "function") {
      onRejected = () => {};
    }

    if (this.status === HD.PENDING) {
      this.callback.push({
        onFulfilled: (val) => {
          try {
            onFulfilled(val);
          } catch (error) {
            onRejected(error);
          }
        },
        onRejected: (val) => {
          try {
            onRejected(val);
          } catch (error) {
            onRejected(error);
          }
        },
      });
    }

    if (this.status === HD.FULFILLED) {
      setTimeout(() => {
        try {
          onFulfilled(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    }

    if (this.status === HD.REJECTED) {
      setTimeout(() => {
        try {
          onRejected(this.value);
        } catch (error) {
          onRejected(error);
        }
      });
    }
  }
}

const a = new HD((resolve, reject) => {
  // const a = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3);
    console.log(2);
  }, 1000);
}).then((res) => {
  console.log(res);
});

console.log(1);
