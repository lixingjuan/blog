/**
 * this的调用四种情况
 * 1. 作为对象的方法调用
 * 2. 作为普通函数调用
 * 3. 构造器调用
 * 4. call,apply调用
 */

/* ****************************************************************************************************
 *                                    this
 ************************************************************************************************* */
/** 1. 作为对象的方法调用: this指向该对象 */
const obj1 = {
  name: "obj1",
  getName: function () {
    return this.name;
  },
};
console.log(obj1.getName());

/**
 * 2. 作为普通函数调用
 * 执行全局对象，浏览器中为window
 */

global.name = "hello, I'm global!";

// 情况1
const getName2 = function () {
  return this.name;
};

// 情况2
const obj2 = {
  name: "obj2",
  getName: function () {
    return this.name;
  },
};

const getName3 = obj2.getName;

console.log(getName2());
console.log(getName3());

/** 记录上层this */
const obj3 = {
  name: "hello",
  age: 25,
  getName: function () {
    console.log(this.name); //指向obj3
    const printAge = function () {
      console.log(this.age); // this指向window
    };
    printAge();
  },
};

obj3.getName();

/** 记录上层this,方法一：将this保存到变量 */
const obj4 = {
  name: "hello",
  age: 25,
  getName: function () {
    console.log(this.name); //指向obj3
    const that = this;
    const printAge = function () {
      console.log(that.age); // this指向window
    };
    printAge();
  },
};
obj4.getName();

/** 记录上层this,方法二：使用箭头函数 */
const obj5 = {
  name: "hello",
  age: 25,
  getName: function () {
    console.log(this.name);
    const printAge = () => {
      console.log(this.age); // this指向window
    };
    printAge();
  },
};
obj5.getName();

/** 严格模式下，函数中的this不会指向全局变量，而是undefined */

const getName4 = function () {
  "use strict";
  console.log(this);
};
getName4();

/**
 * 3. 构造器调用，this指向实例
 */
/** 当使用new操作符调用函数的时候，该函数总会返回一个对象，通常情况下，构造器里的this就指向这个对象，如⬇️ */
const myClass = function () {
  this.name = "lixingjuan";
};
const obj6 = new myClass();
console.log(obj6.name);

/** 使用构造器要注意：如果构造器显式返回了一个object类型的对象，那么此次运算结果最终会返回这个对象，如果return其他类型，则会忽略 */
const myClass2 = function () {
  this.name = "lixingjuan";
  return {
    name: "faker!",
  };
};
const obj7 = new myClass2();
console.log(obj7.name); // "faker!"

/** 如果return其他类型，则会忽略 */
const myClass3 = function () {
  this.name = "lixingjuan";
  return "faker!";
};
const obj8 = new myClass3();
console.log(obj8.name); // lixingjuan

/**
 * 4. Function.prototype.call 或 Function.prototype.apply 调用
 */

/** call和apply可以动态修改传入函数的this */

const obj9 = {
  name: "obj9",
};
const obj10 = {
  name: "obj10",
  getName: function () {
    return this.name;
  },
};

console.log(obj10.getName()); // obj10
console.log(obj10.getName.call(obj9)); // obj9

/* ****************************************************************************************************
 *                                    丢失的this
 ************************************************************************************************* */

const obj11 = {
  name: "obj11",
  getName: function () {
    return this.name;
  },
};
const getObj11Name = obj11.getName;

console.log(obj11.getName()); // obj11
console.log(getObj11Name()); // hello, I'm global!: 指向了全局
