/* ****************************************************************************************************
 *  实现方法：在子类的作用域中执行父类
 *  解决的问题：1. 支持向超类传参； 2. “引用类型值的原型属性” 会被所有实例共享；
 *  问题：1. 只能继承属性，无法继承方法；2. 方法必须定义在子类内部, 复用性差
 *************************************************************************************************** */

// 1. 定义超类型
function SuperType(val) {
  this.colors = ["red", "blue", "green"];
  this.name = val;
}

// 2. 定义子类型
function SubType(name) {
  // 执行父类
  SuperType.call(this, name);

  // 实例属性
  // this.name = name;

  // ❗️ 方法需要定义在这里
  this.sayHello = function () {
    console.log("Hello " + name);
  };
}

// 3. 创建实例
const instance1 = new SubType("hello");
const instance2 = new SubType("world");
