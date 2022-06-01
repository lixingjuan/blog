/* ****************************************************************************************************
 * 寄生式组合继承
 *
 * 实现：
 *  1. 定义一个 inherite，用来实现父子类之间的继承
 *  2. 该方法内部，将 【子类.prototype】 指向 【父类.prototype的副本】，该步骤替代了 组合继承中的
 *                  Sub.prototype = new Super();
 *                  Sub.prototype.constructor = Sub;
 ************************************************************************************************* */



/** 🟡 实现 🟡 */
// 1. 定义inherite 方法
function inheritPrototype(son, father) {
  // 1. 创建超类型原型的一个副本
  const prototype = Object.create(father.prototype);
  // 2. 为创建的副本添加 constructor 属性， 从而弥补因重写原型而失去的默认的 constructor 属性
  prototype.constructor = son;
  // 3. 将新创建的对象（即超类型的副本），赋值给子类型的原型
  son.prototype = prototype;
}


function Super(name) {
  this.name = name;
  this.colors = ['red', 'blue', 'green'];
}

function Sub(name, age) {
  Super.call(this, 'sub');
  this.age = age
}

inheritPrototype(Sub, Super);

Sub.prototype.sayColor = function () {
  console.log(this.colors);
}

const instance1 = new Sub('instance1', 22);
const instance2 = new Sub('instance2', 24);

/** 🔵 测试 🔵 */
console.log(instance1.colors === instance2.colors) // false
instance1.sayColor(); // ['red', 'blue', 'green']

