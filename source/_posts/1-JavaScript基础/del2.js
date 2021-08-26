// async function a() {
//   console.log(await Promise.resolve(1));
// }

// async function b() {
//   console.log(await 2);
// }

// async function c() {
//   console.log(3);
// }

// a();
// b();
// c();
// 组合继承

let OnceMap = 0;

function Super(name) {
  OnceMap += 1;
  this.name = name;
}

function Sub(name) {
  Super.call(this, name);
}

Sub.prototype = new Super();

Sub.prototype.sayName = function () {
  console.log(this.name);
};

const instance1 = new Sub("instance1");
const instance2 = new Sub("instance2");
const instance3 = new Sub("instance2");
const instance4 = new Sub("instance2");
const instance5 = new Sub("instance2");

instance1.sayName();
instance2.sayName();
instance3.sayName();
instance4.sayName();
instance5.sayName();

console.log(OnceMap);
