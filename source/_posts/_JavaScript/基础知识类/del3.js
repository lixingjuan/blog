Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw TypeError("bind can only be used on function!");
  }

  // 保存父作用域的this指向只是为了后面判断，bind返回的函数是否被用了new 调用
  const _self = this;
  const fNOP = function () {};

  const bound = function (...innerArgs) {
    const isUesdByNew = this instanceof _self;

    // 如果被new调用，则this指向不变
    const newThis = isUesdByNew ? this : context;

    return _self.apply(newThis, [...args, ...innerArgs]);
  };

  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
};

const person = {
  name: "lixingjuan",
};

function sayName(greet) {
  console.log(`${greet},${this.name}`);
}

sayName.bind2(person)("hello");
