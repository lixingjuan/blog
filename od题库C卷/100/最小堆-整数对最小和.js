/**
 * @题目描述
 * 给定两个整数数组array1、array2，数组元素按升序排列。
 * 假设从array1、array2中分别取出一个元素可构成一对元素，现在需要取出k对元素，并对取出的所有元素求和，计算和的最小值。
 * 注意：两对元素如果对应于array1、array2中的两个下标均相同，则视为同一对元素。
 *
 * @输入描述
 * 输入两行数组array1、array2，每行首个数字为数组大小size(0 < size <= 100);
 *
 * 0 <array1[i] <=1000
 *
 * 0 <array2[i] <= 1000
 *
 * 接下来一行为正整数 k
 *
 * 0 < k <= array1.size() * array2.size()
 *
 * @输出描述
 * 满足要求的最小和
 *
 * 示例1
 * 输入：
 * 3 1 1 2
 * 3 1 2 3
 * 2
 *
 * 输出：
 * 4
 *
 * 说明：
 * 用例中，需要取2对元素
 * 取第一个数组第1个元素与第二个数组第1个元素组成1对元素[1,1];
 * 取第一个数组第2个元素与第二个数组第1个元素组成1对元素[1,1];
 * 求和为1+1+1+1=4，为满足要求的最小和
 */

function findMinSumPairs(array1, array2, k) {
  const pairs = [];
  // 跳过数组大小标识，直接从实际元素开始
  for (let i = 1; i < array1[0] + 1; i++) {
    for (let j = 1; j < array2[0] + 1; j++) {
      pairs.push([array1[i], array2[j]]);
    }
  }

  // 对所有可能的配对根据它们的和进行排序
  const sortedPairs = pairs.sort((a, b) => a[0] + a[1] - (b[0] + b[1]));

  // 选择和最小的前k个配对
  let minSum = 0;
  for (let i = 0; i < k; i++) {
    minSum += sortedPairs[i][0] + sortedPairs[i][1];
  }

  return minSum;
}

// 示例输入
const array1 = [3, 1, 1, 2];
const array2 = [3, 1, 2, 3];
const k = 2;

// 输出满足要求的最小和
console.log(findMinSumPairs(array1, array2, k));
