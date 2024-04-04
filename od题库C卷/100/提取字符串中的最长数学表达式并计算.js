/**
 * @题目描述
 * 提取字符串中的最长合法简单数学表达式Q，字符串长度最长的，并计算表达式的值。如果没有，则返回0。
 * 简单数学表达式只能包含以下内容
 * 0-9数字，符号 +-*
 * 说明:
 * 1.所有数字，计算结果都不超过long
 * 2.如果有多个长度一样的，请返回第一个表达式的结果
 * 3.数学表达式，必须是最长的，合法的
 * 4.操作符不能连续出现，如 +--+1 是不合法的
 *
 * @输入描述
 * 字符串
 *
 * @输出描述
 * 表达式值
 *
 * 补充说明:
 * @示例1
 * 输入:
 * 1-2abcd
 * 输出:
 * 1
 * 说明:
 */

const demo = (str) => {
  const arr = [...str];
  const result = [];
  const isNumber = (val) => Array.from({ length: 10 }, (a, index) => String(index)).includes(val);
  const isSymbol = (val) => ["+", "-", "*"].includes(val);
  while (!!arr.length) {
    const cur = arr.shift();
    if (!result.length && isNumber(cur)) {
      result.push(cur);
      continue;
    }

    const preIsNumber = isNumber(result.at(-1));
    const preIsSymbol = isSymbol(result.at(-1));
    const isLegal = (preIsNumber && isSymbol(cur)) || (preIsSymbol && isNumber(cur));
    if (isLegal) {
      result.push(cur);
    }
  }
  // 第一遍遍历，找到*地方

  // 遍历result, 进行计算
  // result.reduce(pre)
  return result.join("");
};

console.log(demo("1-2abcd"));
