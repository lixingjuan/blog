/**
 * @题目描述
 * 现有若干个会议，所有会议共享一个会议室，用数组表示各个会议的开始时间和结束时间，
 * 格式为: [[会议1开始时间，会议1结束时间]，[会议2开始时间，会议2结束时间]] 请计算会议室占用时间段。
 *
 * @输入描述
 * [[会议1开始时间，会议1结束时间]，[会议2开始时间，会议2结束时间] ]
 *
 * 备注:
 *
 * 会议个数范围: [1,100]
 * 会议室时间段: [1,24]
 *
 * @输出描述
 * 输出格式预输入一致,具体请看用例。
 *
 * [[会议开始时间，会议结束时间]，[会议开始时间，会议结束时间]
 *
 *
 * @示例1
 * 输入:
 * [[1,4], [2,5],[7,9], [14,18]]
 *
 * 输出:
 * [[1,5], [7,9], [14,18]]
 *
 * 说明:
 * 时间段[1,4]和[2,5]重叠，合并为[1,5]
 *
 * @示例2
 * 输入:
 * [[1,4],[4,5]]
 *
 * 输出:
 * [[1,5]]
 */

const demo = (arr) => {
  if (!arr.length) return [];

  const result = [];
  let currentMerge = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const [start, end] = arr[i];

    if (start <= currentMerge[1]) {
      currentMerge[1] = Math.max(currentMerge[1], end);
    } else {
      result.push(currentMerge);
      currentMerge = arr[i];
    }
  }

  // 最后一个
  result.push(currentMerge);
  return result;
};

console.log(
  demo([
    [1, 4],
    [4, 5],
  ])
);

console.log(
  demo([
    [1, 5],
    [7, 9],
    [14, 18],
  ])
);

console.log(
  demo([
    [1, 4],
    [2, 5],
    [7, 9],
    [14, 18],
  ])
);
