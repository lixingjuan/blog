// 定义超类型构造函数
function Father() {
  this.colors = ["red", "green"];
}

// 定义子类型构造函数
function Son() {}

// 使子类型构造函数的 原型，指向 超类的实例
const FatherInstance1 = new Father();
// const FatherInstance2 = new Father();

// FatherInstance1.colors.push("redd");
// console.log(FatherInstance2.colors);

Son.prototype = FatherInstance1; // 使Son的原型指向Father的实例

// // 创建子类实例
const instance1 = new Son();
const instance2 = new Son();

// // console.log(Father.prototype.isPrototypeOf(instance1));
// // console.log(Father.prototype.isPrototypeOf(instance2));
console.log(Object.getOwnPropertyNames(instance1));
console.log(Object.getOwnPropertyNames(FatherInstance1));

// TODO: 为什么创建 Father 的实例，他的实例可以得到父类的colors属性，但是创建Son的实例，Son的实例上没有colors属性？？？？？？？？？？
