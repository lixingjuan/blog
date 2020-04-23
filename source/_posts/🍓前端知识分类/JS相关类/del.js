class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayName() {
    // 定义类的方法（`sayName`）的时候，前面不需要加 `function` 关键字，也不需要逗号分隔；
    console.log(this.name);
  }
}
const Kris = new Person("Kris", 29);
console.log(Kris.constructor === Person.prototype.constructor);
