// eg.1 借用构造函数
const A = function (name) {
  this.name = name;
};

const B = function () {
  A.apply(this, arguments);
};

B.prototype.getName = function () {
  return this.name;
};

const b = new B("Even");
console.log(b.getName());

// eg.2 借用Array.prototype对象上的方法，修arguments
(function () {
  Array.prototype.push.call(arguments, "hello");
  console.log(arguments);
})(1, 2);

// eg.3 利用apply扩展方法

console.log(Math.max.apply(null, [1, 2, 3]));
