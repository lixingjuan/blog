// Function.prototype.bind2 = function(context) {
//   // 调用该方法者非函数，则抛出错误
//   if (typeof this !== "function") {
//     throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
//   }

//   const self = this;
//   const args = Array.prototype.slice.call(arguments, 1);
//   const fNOP = function() {};

//   const fbound = function() {
//     // 根据this是否是self的实例,判断当前使用 new 操作符通过bind函数创建对象，还是正常的使用bind为函数指定新的执行环境
//     // 当作为构造函数时候，this指向实例，self此时已经指向绑定函数，所以为true
//     // 当作为普通函数时，this指向window, self指向调用bind的函数，此时结果为false，这时改this指向context(用户指定的执行环境)
//     self.apply(this instanceof self ? this : context, [...args, ...arguments]);
//   };

//   fNOP.prototype = this.prototype;
//   fbound.prototype = new fNOP();

//   return fbound;
// };

// // function sayPerson(name, age) {
// //   console.log("name", name);
// //   console.log("age", age);
// //   console.log(this.name);
// //   console.log(this.age);
// // }

// // const person = {
// //   name: "hahah",
// //   age: 23
// // };

// // sayPerson.bind(person)("li", 23);

// // function Point(x, y) {
// //   this.x = x;
// //   this.y = y;
// // }

// // const foo = {
// //   value: 1
// // };
// // function bar(name, age) {
// //   this.habit = "shopping";
// //   this.name = name;
// //   this.age = age;
// //   console.log(age);
// // }

// // bar.prototype.friend = "lixingjuan";

// // const barFunc = bar.bind(foo);

// // const changeAge18 = new barFunc("jack");

// // console.log(changeAge18(18));

// /* 一个绑定函数也可以使用new操作符创建对象，这种方式就相当于将原函数当作构造器，提供的this值被忽略，调用时传入的参数提供给模拟函数 */
// const value = 2;
// const foo = {
//   value: 1
// };

// function bar(name, age) {
//   this.habit = "shopping";
//   console.log(this.value); // 判断当前this指向
//   console.log(name);
//   console.log(age);
// }

// bar.prototype.friend = "kivin";

// const bindFoo = bar.bind(foo, "daisy");

// const obj = new bindFoo("18"); // 此时的this已经指向了obj
// console.log(obj); // undefined,daisy,18

// console.log(obj.habit); // shopping
// console.log(obj.friend); // kivin

/* 手写bind */
Function.prototype.bind2 = function(context) {
  const self = this;
  const args = Array.prototype.slice(arguments, 1);
  const fNOP = function() {};

  const fbound = function() {
    // 如被当作构造函数使用，则此时的this指向实例，则this在self的原型链上，为true
    // 若被当作普通函数使用，则此时的this应该使其执行用户传入的上下文
    self.call(this instanceof self ? this : context, [...args, ...arguments]);
  };

  fNOP.prototype = this.prototype;
  // 如果直接修改fbound的原型也会直接修改函数的原型，这里使用一个空函数进行中转
  fbound.prototype = new fNOP();
  return fbound;
};
