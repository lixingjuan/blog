/**
 * @题目描述
 * 字符串序列判定/最后一个有效字符（本题分值100）
 * 输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。判定S是否是L的有效子串。
 *
 * @判定规则
 *
 * S中的每个字符在L中都能找到（可以不连续），
 * 且S在Ｌ中字符的前后顺序与S中顺序要保持一致。
 * （例如，S=”ace”是L=”abcde”的一个子序列且有效字符是a、c、e，而”aec”不是有效子序列，且有效字符只有a、e）
 *
 * @输入描述
 * 输入两个字符串S和L，都只包含英文小写字母。S长度<=100，L长度<=500,000。
 * 先输入S，再输入L，每个字符串占一行。
 *
 * @输出描述
 * 输出S串最后一个有效字符在L中的位置。（首位从0开始计算，无有效字符返回-1）
 *
 * @用例
 * ace
 * abcde
 * 输出：4
 *
 * @用例
 * fgh
 * abcde
 * 输出：-1
 *
 * @用例 空的S
 *
 * abcde
 * 输出：-1
 *
 * @用例 5：S比L长
 * abcdef
 * abc
 *
 * @用例 完全相等
 * abc
 * abc
 *
 * @用例
 * ab
 * aabb
 */

const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let lineCount = 0;
let S = "";
let L = "";

rl.on("line", function (line) {
  lineCount++;

  if (lineCount === 1) {
    S = line;
    return;
  }

  if (lineCount === 2) {
    L = line;
    let p = 0;

    if (!S.length || S.length > L.length) {
      console.log(-1);
      rl.close();
      return;
    }

    for (let i = 0; i < L.length; i++) {
      const char = L[i];

      if (char === S[p]) {
        // 如果S已经遍历完成，则直接输出结果
        if (p === S.length - 1) {
          console.log(i);
          rl.close();
          return;
        } else {
          p++;
        }
      }
    }

    console.log(-1);
    rl.close();
    return;
  }
});
