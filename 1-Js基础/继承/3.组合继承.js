/* ****************************************************************************************************
 * 组合继承
 * 实现：
 *    1. 使用原型继承方法
 *    2. 使用盗用构造函数继承属性
 * 解决的问题
 *    1. “盗用构造函数继承” 无法继承方法
 *    2. “盗用构造函数继承” 需要将方法定义在构造函数内部，函数无法复用
 ************************************************************************************************* */

/** 🟡 实现 🟡 */

function Super(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
  console.log('ceee')
}

function Sub(name, age) {
  Super.call(this, 'sub');
  this.age = age
}

// 保证原型链的完整性
Sub.prototype = new Super();
Sub.prototype.constructor = Sub;

Sub.prototype.sayName = function () {
  console.log(this.name);
}


const instance1 = new Sub('instance1', 28);
const instance2 = new Sub('instance2', 30);


/** 🔵 测试 🔵 */

// 1. 支持传参
console.log(instance1.name); // sub
console.log(instance1.age); // 28
console.log(instance2.name); // sub



// 2. “原型上的引用类型属性” 不共享
console.log(instance1.colors); // ['red', 'blue', 'green']
console.log(instance2.colors); // ['red', 'blue', 'green']

instance1.colors.push('black')

console.log(instance1.colors); // ['red', 'blue', 'green', 'black']
console.log(instance2.colors); // ['red', 'blue', 'green']



// 3. 原型链完整，所以可以使用 instanceOf 和 isPrototypeOf 方法判断关系
console.log(instance1.constructor); // function Sub(name, age)
console.log(instance1.__proto__); // Super {name: "sub", colors: Array(3)}
console.log(instance1.__proto__.__proto__); // Object {constructor: function Super(name)}
console.log(instance1.__proto__.__proto__.__proto__); // null
console.log(Super.prototype.isPrototypeOf(instance1)); // true
console.log(Sub.prototype.isPrototypeOf(instance1)); // true





/** 🔴 存在的问题 🔴 */
// 1. 无论什么场景，超类型均会被调用两次
// 第一次，使Sub继承Super： Sub.prototype = new Super();
// 第二次，创建实例： Super.call(this, 'sub');


