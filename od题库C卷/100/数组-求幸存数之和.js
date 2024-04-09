/**
 * @题目描述
 * 给一个正整数列nums，一个跳数jump，及幸存数量left。
 * 运算过程为:
 * 从索引为0的位置开始向后跳，中间跳过 J 个数字，命中索引为 J+1的数字，该数被敲出，并从该点起跳，
 * 以此类推，直到幸存left个数为止。
 * 然后返回幸存数之和。
 *
 * @约束
 * 1.0是第一个起跳点。
 * 2.起跳点和命中点之间间隔jump 个数字，已被敲出的数字不计入在内
 * 3.跳到末尾时无缝从头开始(循环查找)，并可以多次循环。
 * 4.若起始时 left > len(nums) 则无需跳数处理过程。
 *
 * @示例1
 * 输入：
 * [1,2,3,4,5,6,7,8,9],4,3
 *
 * 输出：
 * 13
 *
 * 说明：
 * 从1(索引为0)开始起跳,中间跳过4个数字因此依次删除 6,2,8,5,4,7。 剩余 1,3,9,返回和为13
 *
 */

/**
 * 考察点：环形处理数组
 */

/**
 * @计算幸存数之和
 * @param nums  正整数数列，长度范围 [1,10000]
 * @param jump  跳数，范围 [1,10000]
 * @param survivorNum  幸存数量，范围 [1,10000]
 * @return 幸存数之和
 */
function calculateSurvivorsSum(nums, jump, left) {
  // 1. 如果幸存数量大于等于数组长度，则直接返回数组元素之和
  if (left >= nums.length) {
    return nums.reduce((acc, val) => acc + val, 0);
  }

  // 使用数组存储元素，方便删除操作
  let list = [...nums];

  // 初始化起跳点索引为
  let pointer = 0;

  //当列表大小大于幸存数量时，执行删除操作
  while (list.length > left) {
    // !! 计算下一个要删除元素的索引
    pointer = (pointer + jump + 1) % list.length; // 删除计算出的索引处的元素

    // !! 重点：处理被敲掉的元素
    list.splice(pointer, 1);

    /**
     * !! 重点：处理下一步的index
     * !! 由于删除元素后，列表会缩短，下一个起跳点应当向前移动一位
     */
    pointer = pointer - 1;
  }

  //计算并返回剩余元素之和
  return list.reduce((acc, val) => acc + val, 0);
}

// 测试用例 1: 基本情况
console.log(calculateSurvivorsSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 4, 3) === 13);

// 测试用例 2: 较小的数组
console.log(calculateSurvivorsSum([1, 2, 3, 4, 5], 1, 2) === 5);

// 测试用例 3: 大跳数，小数组
console.log(calculateSurvivorsSum([1, 2, 3, 4, 5], 4, 1) === 3);

// // 测试用例 4: left 等于数组长度，无需敲击过程
// console.log(calculateSurvivorsSum([10, 20, 30], 2, 3) === 60);

// // 测试用例 5: left 大于数组长度，无需敲击过程
// console.log(calculateSurvivorsSum([1, 2], 1, 3) === 3);

// // 测试用例 6: 较大的数组
// console.log(calculateSurvivorsSum([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 3, 5) === 30);

// // 测试用例 7: 包含重复数字的数组
// console.log(calculateSurvivorsSum([1, 2, 2, 3, 3, 4, 4, 5, 5], 2, 4) === 12);

// // 测试用例 8: 非常大的跳数，用以测试循环逻辑
// console.log(calculateSurvivorsSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 20, 4) === 14);

// // 测试用例 9: 只剩下一个数字
// console.log(calculateSurvivorsSum([1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 1) === 1);
