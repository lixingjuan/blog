/* ****************************************************************************************************
 * 实现bind
 * bind的特点
 * 1. 返回一个新函数；
 * 2. 参数 1 为要绑定 this 的对象，参数 2 作为新函数的参数；
 * 3. 可以使用 new 操作符，创建 bind 返回的新函数的实例，此时传入的 this 失效；
 ************************************************************************************************* */

Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw TypeError("bind can only be used on function!");
  }

  // 保存父作用域的this指向，是为了后面判断，bind返回的函数是否被用了new 调用
  const _self = this;

  const bound = function (...innerArgs) {
    const isCallWithNew = this instanceof _self;

    // 如果被new调用，则this指向不变
    const newThis = isCallWithNew ? this : context;

    return _self.apply(newThis, [...args, ...innerArgs]);
  };

  const fNOP = function () {};
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
};

const obj = {
  name: "seven",
};

const printName = function () {
  console.log("this.name", this.name);
};

printName.bind2(obj)();

/* ****************************************************************************************************
 *                                    应用：直接调用，改变this指向参数1
 ************************************************************************************************* */
let foo = function (a, b, c) {
  console.log(this.name);
  console.log({ a, b, c });
};

foo(1, 2, 3); // { a: 1, b: 2, c: 3 }

/* ****************************************************************************************************
 *                                    应用: bind-固化一部分参数
 ************************************************************************************************* */

// 此处还未调用

foo = foo.bind2(obj, 1);

foo(2, 3); // { a: 1, b: 2, c: 3 }
