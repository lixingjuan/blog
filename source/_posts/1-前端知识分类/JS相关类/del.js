// const demo = {
//   value: 0,
//   add1: function() {
//     console.log((this.value = this.value + 1));
//     return this;
//   },
//   sub1: function() {
//     console.log((this.value = this.value - 1));
//     return this;
//   }
// };

// demo
//   .add1()
//   .add1()
//   .sub1()
//   .sub1();

// const myPromise = new MyPromise(resolve => {
//   resolve(1);
// }).then(res => {
//   console.log(res);
// });
// const promise = new Promise(resolve => {
//   resolve(1);
// }).then(res => {
//   console.log(res);
// });

// console.log(myPromise);
// console.log(promise);

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
          executorThen(this.resolve, this.reject);
        } catch (error) {
          this.reject(error);
        }
      }
    });
  }
}

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
).then(v => {
  console.log("22 ");
});
console.log("end");
