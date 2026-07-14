/**
 * 策略模式的定义是，定义一系列的算法把他们一个个封装起来，并且是他们呢可以相互替换
 */

/**
 * 举例：年终奖的计算
 *
 * 公司的年终奖是根据员工的工资基数和年底绩效情况来发放的。例如，
 * - 绩效为S的人=> 年终奖有4倍工资；
 * - 绩效为A的人=> 年终奖有3倍工资,
 * - 绩效为B的人=> 年终奖是2倍工资。
 */

const calculateBonus = function (perforamnceLevel, salary) {
  if (perforamnceLevel === "S") {
    return salary * 4;
  }
  if (perforamnceLevel === "A") {
    return salary * 3;
  }
  if (perforamnceLevel === "B") {
    return salary * 2;
  }
};

calculateBonus("S", 2000); // 8000
calculateBonus("B", 1000); // 2000

/**
 * 以上代码有明显缺点：
 * 1. calculateBonus 函数比较庞大，包含了很多if-else 语句，这些语句需要覆盖所有的逻辑分支；
 * 2. calculateBonus 函数缺乏弹性，如果增加了-种新的绩效等级C，或者想把绩效S的奖金系数改为5, 必须深入calculateBonus函数的内部实现，是违反开放-封闭原则的；
 * 3. 算法的复用性差，如果在程序的其他地方需要重用这些计算奖金的算法呢? 我们的选择只有复制和粘贴。
 */

// 初级解决方案: 一般最容易想到的办法就是使用组合函数来重构代码, 把各种算法封装到一个个的小函数里来提高代码复用性

var performanceS = function (salary) {
  return salary * 4;
};

var performanceA = function (salary) {
  return salary * 3;
};

var performanceB = function (salary) {
  return salary * 2;
};

var calculateBonus2 = function (performanceLevel, salary) {
  if (performanceLevel === "S") {
    return performanceS(salary);
  }
  if (performanceLevel === "A") {
    return performanceA(salary);
  }
  if (performanceLevel === "B") {
    return performanceB(salary);
  }
};

calculateBonus2("S", 2000); // 8000
calculateBonus2("B", 1000); // 2000

// 但是仍然有一个重要问题 => calculateBonus函数有可能越来越庞大，而且在系统变化的时候缺乏弹性。
