/* ****************************************************************************************************
 *                                    bind改变this指向
 ************************************************************************************************* */
global.color = "red";
const blueObj = { color: "blue" };
const pinkObj = { color: "pink" };
const blackObj = { color: "black" };

function sayColor(otherValue) {
  console.log(this.color);
  console.log(otherValue);
  return otherValue;
}

sayColor(); // 'red'
sayColor.bind(blueObj)(); // 'blue'
pinkObj.sayColor = sayColor;
pinkObj.sayColor(); // pink, 此时this指向pinkObj
pinkObj.sayColor.bind(blackObj)("222"); // "black", 此时sayColor的this指向 blackObj

/* ****************************************************************************************************
 *                                    bind 传参
 ************************************************************************************************* */

const obj = { color: "red" };
const sayMessage = function (name, age, sex) {
  console.log(name);
  console.log(age);
  console.log(sex);
};
const SayMessageConstructor = sayMessage.bind(obj, 2, 3, 4, 5, 6);
new SayMessageConstructor(7);

/* ****************************************************************************************************
 *                                    new bind 用法
 ************************************************************************************************* */

// instance
const foo = {
  value: 1,
};

function demo(name, age) {
  this.job = "programmer";
  console.log(this.value); // undefined
  console.log(name); // "nameTest2"
  console.log(age); // 19
}

demo.prototype.friend = "huahua";

const bindName = demo.bind(foo, "nameTest2");
const newDemo = new bindName(18);

console.log(newDemo.friend); // "huahua"
console.log(newDemo.job); // "programmer"

const aaa = new Function();
console.log(typeof aaa);
// instance()
// newDemo()

/* ****************************************************************************************************
 *                                    bind实现函数柯里化
 ************************************************************************************************* */

const demoFunc = function (disCount, val) {
  console.log(val * disCount);
};

const disCountFunc = demoFunc.bind(this, 0.3);
disCountFunc(100);
disCountFunc(200);

/* ****************************************************************************************************
 *                                    手写bind
 ************************************************************************************************* */

Function.prototype.bind2 = function (context, ...args) {
  // 如果被应用的不是函数，则报错
  if (typeof this !== "function") {
    throw new Error("bind2只能在函数上使用");
  }
  // 保存当前的 this
  const self = this;

  // 创建一个新函数
  const fNOP = function () {};

  const bound = function (...innerArgs) {
    // 作为构造函数使用时，this指向创建的实例，即 this instanceof self === true
    const isUsedByNew = this instanceof self;
    /**
     * bind的特性，
     * 1. 如果作为构造函数使用，则忽略传进来的this指向，不需要修改this
     * 2. 如果作为普通函数使用，则修改this指向传入的上下文
     */
    const newThis = isUsedByNew ? this : context;
    // 使用apply 函数修改this指向, 并传入参数
    return self.apply(newThis, [...args, ...innerArgs]);
  };

  // ？？ 为什么要做这一步？
  // 如果直接修改bound 的prototype 也会直接修改函数的prototype, 所以使用空函数进行中转
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();

  return bound;
};

console.log(pinkObj.sayColor.bind(blackObj)("blackObj"));

console.log(pinkObj.sayColor.bind2(blackObj)("blackObj"));
