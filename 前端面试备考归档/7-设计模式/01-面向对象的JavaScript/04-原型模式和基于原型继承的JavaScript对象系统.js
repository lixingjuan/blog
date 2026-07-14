/** 实现Object.create方法 */
Object.create =
  Object.create ||
  function (obj) {
    const F = new Function();
    F.prototype = obj;
    return new F();
  };

/* ****************************************************************************************************
 * JavaScript 中的原型继承
 ************************************************************************************************* */

/**
 * 1. 绝大部分数据都是对象
 * JavaScript 中的根对象是 Object.prototype
 * Object.prototype对象是null
 */
console.log(Object.prototype);

/**
 * 2. 要得到一个对象，不是通过实例化类，而是找到一个对象作为原型，并克隆它
 * 比如执行 const obj1 = new Object() 活着 const obj2 = {}, 引擎内部会从Object.prototype上克隆一个对象出来
 */

/**
 * 3. 对象会记住他的原型
 *
 * 就JavaScript的真正实现来说，其实不能说对象有圆形，而只能说，对象的构造器有圆形
 */

const Person = function (name) {
  this.name = name;
};
Person.prototype.getName = function () {
  return this.name;
};

const TomPersona = new Person("Tom");

console.log(TomPersona);
console.log(TomPersona.__proto__);

/**
 * 4. 如果对象无法响应某个请求，它会把这个请求委托给他的构造器的原型
 */
