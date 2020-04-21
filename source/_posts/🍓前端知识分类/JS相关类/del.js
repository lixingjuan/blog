// /* 寄生式继承 */
// const person = {
//   name: "Tom",
//   friends: ["Herry", "Merry"]
// };

// // 前面的原型式继承函数，该函数并非必须的，任何能够返回新对象的函数都适用于此模式
// function object(o) {
//   function F() {}
//   F.prototype = o;
//   return new F();
// }

// function createAnother(original) {
//   const clone = object(original);
//   // 为新对象添加自己的方法
//   clone.sayHi = function() {
//     console.log("hi");
//   };
//   return clone;
// }

// const instance1 = createAnother(person);
// const instance2 = createAnother(person);
// instance1.sayHi();
// // 修改实例1 的引用属性值
// instance1.friends.push("cat");

// instance2.friends; // [ 'Herry', 'Merry', 'cat' ]

/* 寄生式组合继承 */

/**
 * @param {Object} son 子类型构造函数
 * @param {Object} father 超类型构造函数
 */
function inheritPrototype(son, father) {
  // 1. 创建超类型原型的一个副本
  const prototype = Object.create(father.prototype);
  // 2. 为创建的副本添加 constructor 属性， 从而弥补因重写原型而失去的默认的 constructor 属性
  prototype.constructor = son;
  // 3. 将新创建的对象（即超类型的副本），赋值给子类型的原型
  son.prototype = prototype;
}
-inheritPrototype;
