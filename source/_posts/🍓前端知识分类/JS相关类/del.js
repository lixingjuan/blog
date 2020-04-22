class Person {
  constructor() {
    // return this;
    return Object.create(null);
  }
}
// function Person() {}

const instance1 = new Person();

console.log(instance1 instanceof Person);
console.log(Person.prototype.isPrototypeOf(instance1));
