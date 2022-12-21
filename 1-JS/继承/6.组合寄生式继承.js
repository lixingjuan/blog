/* ****************************************************************************************************
 * 寄生式组合继承
 *
 * 实现方式：1. 前面步骤同组合继承
 *      2. 原型链接的地方，采用寄生继承，实现一个函数，利用Object.create, 完成原型链接
 * 解决的问题：组合继承中，构造函数总被调用两次的问题
 ************************************************************************************************* */

// 1. 定义inherite 方法： Sub.prototype = Object.create(Super.prototype)
function inheritPrototype(son, father) {
  // 1. 创建超类prototype的一个副本
  const prototype = Object.create(father.prototype);
  // 2. 超类prototype副本 constructor 属性指向子类
  prototype.constructor = son;
  // 3. 超类prototype副本赋值给 子类
  son.prototype = prototype;
}

// 2. 定义父类
function Super(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}

// 3. 定义子类，并在子类中执行 `父类.call(this)`
function Sub(name, age) {
  Super.call(this, "sub");
  this.age = age;
}

// 4. 调用inheritPrototype, 父子继承
inheritPrototype(Sub, Super);

// 5. 子类自定义方法
Sub.prototype.sayColor = function () {
  console.log(this.colors);
};
