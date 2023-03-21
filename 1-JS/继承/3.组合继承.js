/* ****************************************************************************************************
 * 实现：
 *    1. “借用构造函数继承” 继承属性
 *    2. “原型链继承” 继承方法
 *
 * 解决的问题：
 *    1. “借用构造函数继承” 无法继承方法
 *    2. “借用构造函数继承” 需要将方法定义在构造函数内部，函数无法复用
 *
 * 问题：
 *    超类型总会被调用两次
 *    1. 第一次，使Sub继承Super： Sub.prototype = new Super();
 *    2. 第二次，创建实例：Super.call(this, 'sub');
 ************************************************************************************************* */

// 1. 定义父类，this.xx 指定属性
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
  console.log("ceee");
}

// 2. 定义子类，内部执行父类
function Sub(name, age) {
  Super.call(this, "sub");
  this.age = age;
}

// 3. 子类的prototype指向超类
Sub.prototype = new Super();
// 4. 子类的prototype的constructor指向自己
Sub.prototype.constructor = Sub;

// 5. 在子类的prototype上定义方法
Sub.prototype.sayName = function () {
  console.log(this.name);
};

const instance1 = new Sub("instance1", 28);
const instance2 = new Sub("instance2", 30);

/** 🔵 测试 🔵 */

// 1. 支持传参
console.log(instance1.name); // sub
console.log(instance1.age); // 28
console.log(instance2.name); // sub

// 2. “原型上的引用类型属性” 不共享
console.log(instance1.colors); // ['red', 'blue', 'green']
console.log(instance2.colors); // ['red', 'blue', 'green']

instance1.colors.push("black");

console.log(instance1.colors); // ['red', 'blue', 'green', 'black']
console.log(instance2.colors); // ['red', 'blue', 'green']

// 3. 原型链完整，所以可以使用 instanceOf 和 isPrototypeOf 方法判断关系
console.log(instance1.constructor); // function Sub(name, age)
console.log(instance1.__proto__); // Super {name: "sub", colors: Array(3)}
console.log(instance1.__proto__.__proto__); // Object {constructor: function Super(name)}
console.log(instance1.__proto__.__proto__.__proto__); // null
console.log(Super.prototype.isPrototypeOf(instance1)); // true
console.log(Sub.prototype.isPrototypeOf(instance1)); // true

/* ****************************************************************************************************
 *                                    缺点
 ************************************************************************************************* */
