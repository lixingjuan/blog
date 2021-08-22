// /**
//  * @desc : Promise的特点
//  * 1. Promise有三个状态，pending, fulfilled, rejected
//  * 2. 状态改变后不可再次改变(判断如果已经处于fulfilled, rejected，则不可再次切换其状态)
//  * 3. 可以使用new 操作符进行实例化(不能用箭头函数实现)
//  * 4. 可以直接通过调用 Promise.resolve()或者Promise.reject() 方法返回 fulfilled/rejected 状态的 Promise
//  * 5. 具有thanable 接口 (Promise 的 prototype 上需要有 then方法)
//  * 6. then 方法接受两个处理程序，onResolved, onRejcted, 分别对应Promise 状态变为 fulfilled/rejected 时进行调用
//  */

// class Promise2 {
//   state = "pending";

//   constructor(executor) {
//     if (!executor || typeof executor !== "function") {
//       throw SyntaxError("executor must be function");
//     }
//     console.log(executor);

//     executor(this.resolve, this.reject);
//   }

//   resolve() {
//     this.state = fulfilled;
//     return this;
//   }

//   reject() {
//     console.log("reject");
//   }

//   onResolved() {}

//   onRejcted() {}

//   then() {
//     if (this.state === "fulfilled") {
//       this.onResolved();
//     } else {
//       this.onRejcted();
//     }
//   }
// }

async function randomDelay(id) {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    console.log(`${id} finished`);
    resolve();
  }, delay);
}

async function foo() {
  console.time("foo");

  await randomDelay("p1");
  await randomDelay("p2");
  await randomDelay("p3");
  await randomDelay("p4");
  await randomDelay("p5");
  await randomDelay("p6");
  // await p1;
  // await p2;
  // await p3;
  // await p4;
  // await p5;
  // await p6;
  console.timeEnd("foo");
}

foo();
