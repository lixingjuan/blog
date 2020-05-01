define(function(require, exports, module) {
  const a = required("./a"); // ？？？在需要时声明
  a.doSomething();
  if (false) {
    const b = require("./b");
    b.doSomething();
  }
});

function Promise2(fn) {
  var state = "pending";
  var value = null,
    callbacks = [];
  // onFulfilled 就是then小括号里面的函数，把异步操作成功时要执行的函数放进callbacks队列
  this.then = function(onFulfilled) {
    if ((state = "pending")) {
      callbacks.push(onFulfilled);
      return this;
    }
  };

  // 参数value就是传递给Promise2的实例
  function resolve(value) {
    state = "fulfilled";
    execute();
  }
  //
  function reject(value) {
    state = "rejected";
  }
  function execute() {
    // setTimeout是为了避免Promise内部的函数是同步函数，通过setTimeout机制，将js放在任务执行的队尾
    setTimeout(function() {
      callbacks.forEach(function(callback) {
        callback(value);
      }, 0);
    });
  }

  fn(resolve, reject);
}
