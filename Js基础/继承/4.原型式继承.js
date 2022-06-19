/* ****************************************************************************************************
 * Object.create - create a new object with a prototype
 ************************************************************************************************* */
let Person = function (sex) {
  this.sex = sex;
};
let Boy = new Person("boy");
console.log(Boy);
// const Tom = new Boy();

// ES5
const object = function (o) {
  function F() {}
  F.prototype = o;
  return new F();
};

// ES6
Object.create(Person, {
  age: {
    value: 28,
  },
});

console.log(object(Tom).prototype === Tom.prototype); // true
console.log(Object.create(Tom).prototype === Tom.prototype); // true
console.log(Tom.prototype);
