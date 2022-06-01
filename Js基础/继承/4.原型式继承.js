/* ****************************************************************************************************
 * 原型式继承
 * 实现：
 *    1. 实现一个函数，在函数内部将参数的原型链上的属性复制到当前对象上，并返回
 ************************************************************************************************* */

/** 🟡 实现 🟡 */
const Person = {
  name: 'John',
  color: ['red', 'blue', 'green'],
  sayName: function () {
    console.log(this.name);
  }
}

// ES5
const inherit = function (o) {
  // 定义一个空对象
  function F() { }
  // 将参数的原型链上的属性复制到当前对象上
  F.prototype = o;
  // 返回新对象
  return new F();
}

const instance1 = inherit(Person);


// ES6,
// 参数1. 被继承对象
// 参数2，额外的属性，用法同 Obect.defineProperties 的第二个参数
const instance2 = Object.create(Person, {
  age: {
    value: 28
  }
})


/** 🔵 测试 🔵 */
console.log(instance1.name === 'John'); // true
console.log(instance2.name === 'John'); // true
instance2.sayName(); // John
console.log(instance2.age === 28) // true



/** 🔴 存在的问题 🔴 */
// 同原型链继承，只不过换了一种写法