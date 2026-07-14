/** 使用策略重构代码, 如⬇️ */

/* 每种绩效的计算规则都封装在对应的策略类里面 */
const strategies = {
  S: function (salary) {
    return salary * 4;
  },
  A: function (salary) {
    return salary * 3;
  },
  B: function (salary) {
    return salary * 2;
  },
};

const calculateBonus3 = function (level, salary) {
  return strategies[level](salary);
};

calculateBonus3("S", 2000); // 8000
calculateBonus3("B", 1000); // 2000
