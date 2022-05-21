/** 书上的写法 */
Function.prototype.before1 = function (beforeFn) {
  const _self = this;

  return function () {
    beforeFn.apply(this, arguments);
    return _self.apply(this, arguments);
  };
};

/** ES6 改写 */
Function.prototype.before2 = function (beforeFn) {
  return (...args) => {
    beforeFn(...args);
    return this.apply(this, args);
  };
};

let logName = function (name) {
  console.log(name);
};

logName = logName.before2(function () {
  console.log("hhahah");
});

logName("miao");
