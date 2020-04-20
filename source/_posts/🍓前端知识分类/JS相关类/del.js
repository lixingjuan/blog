function Father() {
  this.colors = ["red", "green"];
  console.log(this.colors);
}
function Son() {}
Son.prototype = new Father(); // 使Son的原型指向Father的实例
const instance1 = new Son();
const instance2 = new Son();

console.log(Father.prototype.isPrototypeOf(instance1));
console.log(Father.prototype.isPrototypeOf(instance2));
instance1.colors.push("black");
console.log(instance1.colors); // [ 'red', 'green', 'black' ]
console.log(instance2.colors); // [ 'red', 'green', 'black' ]
console.log(Father()); // [ 'red', 'green', 'black' ]
