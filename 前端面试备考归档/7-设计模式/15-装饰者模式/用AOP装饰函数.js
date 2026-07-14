/**
 * 定义
 * Function.prototype.before
 * Function.prototype.after
 */

Function.prototype.before = function (beforeFn) {
  const _self = this; // 保存原函数的引用

  // 返回包含了原函数和新函数的“代理函数”
  return function () {
    beforeFn.apply(this, arguments); // 执行新函数，且保证this不被劫持，新函数接受的参数也会原封不到的传入原函数
    return self.apply(this, arguments); // 执行原函数，并返回原函数的执行结果，且保证this不被劫持
  };
};

Function.prototype.after = function (afterFn) {
  const _self = this;
  return function () {
    const resutl = self.apply(this, arguments);
    afterFn.apply(this, arguments);
    return resutl;
  };
};

/* ****************************************************************************************************
 *                                    ⬇️ 不污染原型的实现方法
 ************************************************************************************************* */

const before = function (fn, beforeFn) {
  return function () {
    beforeFn.apply(this, arguments);
    return fn.apply(this, arguments);
  };
};

const composeFn = before(
  function (params) {
    console.log("原函数执行");
  },
  function () {
    console.log("before函数执行");
  }
);
composeFn();
