const a = {
  color: "red",
};

global.color = "yellow";

function sayColor(...val1) {
  console.log("this.color", this.color);
  console.log("val1", val1);
}

console.log("------bind的结果------");
// sayColor.bind(null)(); // "yellow";
// sayColor.bind(a)(); // "red"
// // const tempFunc = sayColor.bind(a, "1");
// new sayColor.bind(a, "1")();

console.log("------bind的结果------");
const fNOP = function () {};

Function.prototype.bind2 = function (context, ...params) {
  // 如果被应用的不是函数，则报错
  // if (typeof this !== "function") {
  //   throw new TypeError("bind2只能在函数上使用");
  // }

  const self = this;
  new self();

  const bound = function (...innerParams) {
    console.log("self", self);
    const isUsedByNew = this instanceof self;

    const realThis = isUsedByNew ? this : context;

    const newParams = [...params, ...innerParams];
    return self.apply(realThis, newParams);
  };

  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
};

console.log("------bind2的结果------");
// sayColor.bind2(null)(); // "yellow";
// sayColor.bind2(a)(); // "red"
new sayColor.bind(a, "1")();
console.log("------bind2的结果------");
