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
 *    1. 第一次，使Dog继承Animal： Dog.prototype = new Animal();
 *    2. 第二次，创建实例：Animal.call(this, 'Dog');
 ************************************************************************************************* */

function Animal(category) {
  this.category = category;
  this.colors = ["red", "blue", "green"];
  console.log("调用父类Animal");
}

function Dog(name) {
  Animal.call(this, "dog");
  this.name = name;
}

Dog.prototype = new Animal("Dog");
Dog.prototype.constructor = Dog;

Dog.prototype.sayName = function () {
  console.log(this.name);
};

const dog1 = new Dog("Max");
const dog2 = new Dog("Jell");

dog1.sayName();
dog2.sayName();
