/* ****************************************************************************************************
 *                                    例子
 ************************************************************************************************* */

/**
 * 计算每个月的消费，前29天调用函数仅存储数据，第30天才计算总和
 */

/**
 * 实现
 * 1. 调用cost时候，如果明确带上了一些参数，表示此事不进行真正的求值，而是把参数保存起来，此时让cost函数返回另外一个函数
 * 2. 只有当我们以不带参数的形式执行cost时，才利用前面保存的所有参数
 */
const currying = function (fn) {
  const args = [];

  return function inner() {
    // 利用之前的保存的参数进行调用
    // core-start
    if (arguments.length === 0) {
      return fn.apply(this, args);
    }

    // 不调用，将参数保存起来
    args.push(...arguments);
    // arguments.callee, 即inner函数本身
    return arguments.callee;
    // core-end
  };
};

let cost = (function () {
  let money = 0;
  return function () {
    for (let i = 0, l = arguments.length; i < l; i++) {
      money += arguments[i];
    }
    return money;
  };
})();

cost = currying(cost);

console.log(cost(100)); // 未真正求值
console.log(cost(200)); // 未真正求值
console.log(cost(300)); // 未真正求值
console.log(cost(400)); // 未真正求值
console.log(cost()); // 1000
