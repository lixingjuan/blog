/* ****************************************************************************************************
 * 实现方法： 子类.prototype指向 父类实例
 * 缺点；1. 父类引用类型属性会实例共享；2. 子类无法向超类传参；
 ************************************************************************************************* */

// 1. 定义超类型
const SuperType = function () {};
SuperType.prototype.sayHello = function () {
  console.log("hello");
};

// 2. 定义子类型
const SubType = function () {};
SubType.prototype = new SuperType();

// 3. 创建子类型的实例
const person = new SubType();
