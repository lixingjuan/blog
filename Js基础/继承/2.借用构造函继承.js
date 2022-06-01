/* ****************************************************************************************************
 *  2. 借用构造函数继承，
 *
 *  实现: 在子类构造函数中，【this指向的是实例】，利用call，apply, 在子类的实例上执行一遍父类
 *  解决的问题:
 *      1. 支持向构造函数传递参数
 *      2. “引用类型值的原型属性” 会被所有实例共享；
 ************************************************************************************************* */


/** 🟡 实现 */

// 1. 定义超类型
function SuperType() {
  this.colors = ['red', 'blue', 'green'];
}

// 2. 定义子类型
function SubType(name) {
  // 执行父类
  SuperType.call(this);

  // 实例属性
  this.name = name;
}

// 3. 创建实例
const instance1 = new SubType("hello");
const instance2 = new SubType("world");





/** 🔵 测试 */

// 1. 子类可以向构造函数传参
console.log(instance1.name); // "hello"
console.log(instance2.name); // "world"

// 2. 实例上的引用类型属性独立
instance1.colors; // ["red", "blue", "green"]
instance2.colors; // ["red", "blue", "green"]
instance1.colors.push('black');
console.log(instance1.colors); // ["red", "blue", "green", "black"]
console.log(instance2.colors); // ["red", "blue", "green", "black"]


/** 🔴 存在的问题 */

// 1. 只能继承属性，无法继承方法
// (由于父类不在构造函数的原型链上，所以不能调用父类的方法)
console.log(SuperType.prototype.isPrototypeOf(SuperType)); // false
console.log(SuperType.prototype.isPrototypeOf(instance1)); // false
SuperType.sayHello = function () {
  console.log('Hello')
}
console.log(instance1.sayHello); // undefined

// 2. 方法必须定义在构造函数内部, 复用性差
function SubType2(name) {
  // 执行父类
  SuperType.call(this);
  // 实例属性
  this.name = name;

  // ❗️ 方法需要定义在这里
  this.sayHello = function () {
    console.log('Hello ' + name);
  }
}
const instance3 = new SubType2('Tom')
instance3.sayHello(); // "Hello Tom"
