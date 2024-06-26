/**
 * @题目描述
 * 中秋节，公司分月饼，m个员工，买了n个月饼，m<=n，每个员工至少分1个月饼，但可以分多个，
 * 单人分到最多月饼的个数是Max1，单人分到第二多月饼个数是Max2，Max1-Max2<=3，
 * 单人分到第n-1多月饼个数是Max(n-1)，单人分到第n多月饼个数是Max(n)，Max(n-1)-Max(n)<=3
 * 问有多少种分月饼的方法?
 *
 * @输入描述
 * 每一行输入m n，表示m个员工，n个月饼，m<=n
 *
 * @输出描述
 * 输出有多少种月饼分法
 *
 * @示例1
 * 输入：
 * 2 4
 * 输出：
 * 2
 *
 * 说明：
 * 分法有2种
 * 4=1+3
 * 4=2+2
 * 注意:1+3和3+1算一种分法
 *
 * @示例2
 * 输入：
 * 3 5
 * 输出：
 * 2
 *
 * 说明：
 * 5=1+1+3
 * 5=1+2+2
 *
 *
 */

function divideMooncake(m, n) {
  // 用于存储所有分配方案的数组
  let results = [];

  // 辅助函数，用于递归地尝试所有分配方案
  function tryDivide(leftMooncakes, currentAllocation, minAllocated) {
    if (currentAllocation.length == m - 1) {
      // 如果已经为m-1个员工分配了月饼，则剩下的都给最后一个员工
      if (leftMooncakes >= minAllocated && leftMooncakes <= minAllocated + 3) {
        results.push([...currentAllocation, leftMooncakes]);
      }
      return;
    }

    // 尝试为当前员工分配月饼
    for (
      let i = minAllocated;
      i <= Math.min(leftMooncakes - (m - currentAllocation.length - 1), minAllocated + 3);
      i++
    ) {
      tryDivide(leftMooncakes - i, [...currentAllocation, i], i);
    }
  }

  // 从每人至少分配1个月饼开始尝试
  tryDivide(n, [], 1);

  // 返回所有满足条件的分配方案数量
  return results.length;
}

console.log(divideMooncake(1, 1)); // 输出应为2
console.log(divideMooncake(1, 2)); // 输出应为1
console.log(divideMooncake(1, 3)); // 输出应为1
console.log(divideMooncake(1, 4)); // 输出应为1

console.log(divideMooncake(2, 2)); // 输出应为1
console.log(divideMooncake(2, 3)); // 输出应为1
console.log(divideMooncake(2, 4)); // 输出应为2
console.log(divideMooncake(3, 5)); // 输出应为2
