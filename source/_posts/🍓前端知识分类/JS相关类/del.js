class Person {
  // constructor() {
  //   this.height = 130;
  // }
  static age = 18;
  height = 164;
  static sayAge() {}
  sayName() {}
}
const Jack = new Person();
// 获取类本身属性
console.log(Object.getOwnPropertyNames(Person));
// 获取类原型上的本身的属性
console.log(Object.getOwnPropertyNames(Person.prototype));
console.log(Object.getOwnPropertyNames(Jack));
