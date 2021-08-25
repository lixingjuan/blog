const FULLFILLED = "fullfiled";
const REJECTED = "rejected";
const PENDING = "pending";

/**
 * @desc 构造函数
 * @param {*} executor
 */
class MyPromise {
  constructor(executor) {
    if (typeof executor !== "function") throw new Error("need function");
    // 赋予每个实例一些常量
    this.state = PENDING;
    this.value = undefined;
    this.reason = undefined;

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = "fulfilled";
        this.value = value;
      }
    };

    const reject = (value) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.value = value;
      }
    };

    executor(resolve, reject);

    // 如果执行executor出错直接执行reject
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFullfilled, onRejected) {
    console.log("我是then方法");
    if (this.state === FULLFILLED) {
      onFullfilled(this.value);
      return MyPromise(() => {});
    }
    if (this.state === REJECTED) {
      onRejected(this.value);
    }
  }
}

const p1 = new MyPromise((resolve, reject) => {
  resolve(1);
}).then(
  () => {
    console.log("我是resolve");
  },
  () => {
    console.log("我是 rejected");
  }
);

console.log(p1);
