define(function(require, exports, module) {
  const a = required("./a"); // ？？？在需要时声明
  a.doSomething();
  if (false) {
    const b = require("./b");
    b.doSomething();
  }
});
