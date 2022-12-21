/* ****************************************************************************************************
 * Object.create - 创建一个带有prototype的新对象
 ************************************************************************************************* */
// 前提代码

let Person = function (sex) {
  this.sex = sex;
};
let Boy = new Person("boy");
console.log(Boy);
// const Tom = new Boy();

// ES5实现方式：将函数.prototype指向指定对象
const object = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
};

// ES6: 新的api, object.create, 还支持增加属性
const Tom = Object.create(Person, {
  age: {
    value: 28,
  },
});

console.log(Tom.age);
