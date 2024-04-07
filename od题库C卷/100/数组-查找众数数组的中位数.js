/**
 * @题目描述
 * 1.众数是指一组数据中出现次数量多的那个数，众数可以是多个
 * 2.中位数是指把一组数据从小到大排列，最中间的那个数，如果这组数据的个数是奇数，那最中间那个就是中位数，如果这组数据的个数为偶数，那就把中间的两个数之和除以2，所得的结果就是中位数
 * 3.查找整型数组中元素的众数并组成一个新的数组，求新数组的中位数
 *
 * @输入描述
 * 输入一个一维整型数组，数组大小取值范围 0<N<1000，数组中每个元素取值范围 0<E<1000
 *
 * @输出描述
 * 输出众数组成的新数组的中位数
 *
 * @示例1
 * 输入
 * 10 11 21 19 21 17 21 16 21 18 15
 * 输出
 * 21
 *
 * @示例2
 * 输入
 * 2 1 5 4 3 3 9 2 7 4 6 2 15 4 2 4
 * 输出
 * 3
 *
 * @示例3
 * 输入
 * 5 1 5 3 5 2 5 5 7 6 7 3 7 11 7 55 7 9 98 9 17 9 15 9 9 1 39
 * 输出
 * 7
 */

const demo = (arr) => {
  let resultArr = [];
  let maxCount = 0;

  // !! 组装映射关系 Map<数字, 出现次数>
  const tempMap = arr.reduce((pre, cur) => pre.set(cur, (pre.get(cur) || 0) + 1), new Map());
  const entries = tempMap.entries();

  for (const iterator of entries) {
    const [num, count] = iterator;
    // !! 理解这个过程很重要！如果找到了新的出现最多的，清空众数数组，重新开始
    if (count > maxCount) {
      resultArr = [];
      resultArr.push(num);
      maxCount = count;
    } else if (count === maxCount) {
      resultArr.push(num);
    }
  }

  // 确保结果数组是有序的，这对计算中位数很重要
  resultArr.sort((a, b) => a - b);

  const resultLen = resultArr.length;

  // !! 处理中位数的过程，要考虑数组长度奇数、偶数的情况
  // 处理数组长度为偶数的情况
  if (resultLen % 2 === 0) {
    const mid1 = resultArr[resultLen / 2 - 1];
    const mid2 = resultArr[resultLen / 2];
    return (mid1 + mid2) / 2; // 正确处理中位数
  } else {
    // 处理数组长度为奇数的情况
    return resultArr[Math.floor(resultLen / 2)];
  }
};

console.log(demo([2, 1, 5, 4, 3, 3, 9, 2, 7, 4, 6, 2, 15, 4, 2, 4]));
