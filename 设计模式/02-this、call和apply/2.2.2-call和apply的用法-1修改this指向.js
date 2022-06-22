global.name = "Big Window";

// eg.1
const obj = {
  name: "Mary",
};

const getName = function () {
  console.log(this.name);
};

getName(); // "Big Window"

getName.apply(obj); // Mary

// eg.2
const person = {
  name: "Tom",
  getName: function () {
    console.log(this.name);
  },
};
const personGetName = person.getName;

person.getName(); // Tom

personGetName(); // "Big Window", 请注意，此时this指向全局，浏览器为window

// eg.3
const getAge = function () {
  "use strict";
  console.log(this);
};

getAge(); // undefined, 严格模式下，函数的this为undefined

// eg.4
const getAge2 = () => {
  console.log(this);
};

getAge2(); // 浏览器为window, node环境为{}
