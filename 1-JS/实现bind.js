Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== "function") {
    throw new TypeError("bind2只能被用在函数上");
  }

  const _self = this;

  const bound = function (...innerArgs) {
    const isCalledByNew = this instanceof _self;

    const newThis = isCalledByNew ? this : _self;

    return _self.apply(newThis, [...args, ...innerArgs]);
  };

  const fNOP = function () {};
  fNOP.prototype = this.prototype;
  bound.prototype = new fNOP();
  return bound;
};
