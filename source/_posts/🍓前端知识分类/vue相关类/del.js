/*
 * bind 的特点
 * 1. 返回一个新函数；
 * 2. 参数1为要绑定this的对象，参数2作为新函数的参数；
 * 3. 可以使用new操作符，创建bind返回的新函数的实例；
 */

/* 函数柯里化实现一个bind */

Function.prototype.bind2 = function(context, ...args) {
  console.log(this);
  console.log(typeof this);
};
const sayHi = function() {
  console.log("Hi");
};
sayHi.bind2();
