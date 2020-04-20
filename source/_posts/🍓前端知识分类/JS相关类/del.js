/* 借用构造函数实现继承 */
function Father(name) {
  this.name = name;
  this.colors = ["red", "green"];
}

Father.prototype.sayName = function() {
  console.log(this.name);
};

function Son(name, age) {
  Father.call(this, name);
  this.age = age;
}

// 继承方法
Son.prototype = new Father();
Son.prototype.constructor = Son;
Son.prototype.sayAge = function() {
  console.log(this.age);
};

const instance1 = new Son("Tom", 24);
instance1.sayName(); // 'Tom'
instance1.sayAge(); // 24
instance1.colors.push("pink");
console.log(instance1.colors); // [ 'red', 'green', 'pink' ]

const instance2 = new Son("Marry", 12);
instance2.sayName(); // 'Marry'
instance2.sayAge(); // 12
instance2.colors.push("black");
console.log(instance2.colors); // [ 'red', 'green', 'black' ]
