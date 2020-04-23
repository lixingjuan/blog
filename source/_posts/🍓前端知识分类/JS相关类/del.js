function inheritPrototype(son, father) {
  const prototype = Object.create(father.prototype);
  prototype.constructor = son;
  son.prototype = prototype;
}

function Person() {
  console.log(new.target);
}
Person.prototype.sayHello = function() {
  console.log("hello");
};
const Jack = function() {};

Person();
const PersonInstance = new Person();

/* 通过原型继承方法实现Person子类 */
// Jack.prototype = new Person();
// new Person().constructor = Jack;
inheritPrototype(Jack, Person);
Jack.prototype.sayHello();
const JackInstance = new Jack();
JackInstance.sayHello();
