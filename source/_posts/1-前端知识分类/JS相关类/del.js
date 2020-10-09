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

// 因为会立即执行这个执行器函数
function Person() {}

const instance1 = new Person();

console.log(instance1.prototype);
