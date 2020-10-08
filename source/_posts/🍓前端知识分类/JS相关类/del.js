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

let a = {};
let b = { name: 2 };

// Object.assign(a, b);
a = b;

console.log(a);
a.name = 3;

console.log(a);
console.log(b);
