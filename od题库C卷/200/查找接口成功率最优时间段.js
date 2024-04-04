/**
 *
 * @题目描述
 * 服务之间交换的接口成功率作为服务调用关键质量特性，某个时间段内的接口失败率使用一个数组表示。
 * 数组中每个元素都是单位时间内失败率数值，数组中的数值为0~100的整数，
 * 给定一个数值(minAverageLost)表示某个时间段内平均失败率容忍值，即平均失败率小于等于minAverageLost.找出数组中最长时间段，
 * 如果未找到则直接返回NULL。
 *
 * @输入描述
 * 有两行内容，
 * 第一行为 minAverageLost，
 * 第二行为数组，数组元素通过空格(" ")分隔,
 *
 * minAverageLost及数组中元素取值范围为0~100的整数，数组元素的个数不会超过100个
 *
 * @输出描述
 * 找出平均值小于等于minAverageLost的最长时间段，输出数组下标对，格式{beginIndex}-{endIndex} (下标从0开始)，
 * 如果同时存在多个最长时间段，则输出多个下标对且下标对之间使用空格(” “)拼接，多个下标对按下标从小到大排序。
 *
 *
 * @示例1
 * 输入：
 * 1
 * 0 1 2 3 4
 *
 * 输出：
 * 0-2
 *
 * 说明：
 * A、输入解释：minAverageLost=1，数组[0, 1, 2, 3, 4]
 * B、前3个元素的平均值为1，因此数组第一个至第三个数组下标，即0-2
 *
 * @示例2
 * 输入：
 * 2
 * 0 0 100 2 2 99 0 2
 * 输出：
 * 0-1 3-4 6-7
 *
 * 说明：
 * A、输入解释：minAverageLost=2，数组[0, 0, 100, 2, 2, 99, 0, 2]
 * B、通过计算小于等于2的最长时间段为：数组下标为0-1即[0, 0]，数组下标为3-4即[2, 2]，数组下标为6-7即[0, 2]，这三个部分都满足平均值小于等2的要求，因此输出0-1 3-4 6-7
 *
 *
 * @测试用例1
 * 输入:
 * 1
 * 0 1 2 3 4
 * 输出:
 * 0-2
 * 说明: 平均失败率为1的最长时间段为前三个元素[0, 1, 2]，对应的下标范围是0-2。

 * @测试用例2
 * 输入:
 * 2
 * 0 0 100 2 2 99 0 2
 * 输出:
 * 0-1 3-4 6-7
 * 说明: 平均失败率小于等于2的最长时间段为[0, 0], [2, 2], 和[0, 2]，对应的下标范围分别是0-1, 3-4, 和6-7。

 * @测试用例3
 * 输入:
 * 3
 * 2 2 2 2 2
 * 输出:
 * 0-4
 * 说明: 整个数组的平均失败率恰好等于3，因此整个数组是满足条件的最长时间段。

 * @测试用例4
 * 输入:
 * 50
 * 51 49 50 50 51
 * 输出:
 * 1-4
 * 说明: 平均失败率小于等于50的最长时间段为[49, 50, 50]，对应的下标范围是1-3。

 * @测试用例5
 * 输入:
 * 10
 * 11 12 13 14 15
 * 输出:
 * NULL
 * 说明: 所有的失败率都高于10，没有满足条件的时间段。
 */

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let minAverageLost = 0;
let lineCount = 0;

rl.on("line", (line) => {
  lineCount++;
  if (lineCount === 1) {
    minAverageLost = parseInt(line, 10);
  } else if (lineCount === 2) {
    const arr = line.split(" ").map(Number);

    let results = [];
    let start = 0;
    let sum = 0;
    let maxLen = 0;

    // 遍历数组，以每个位置作为终点，寻找平均数符合条件的窗口
    for (let end = 0; end < arr.length; end++) {
      // 总数加上当前数字
      sum += arr[end];

      // 缩小窗口寻找符合条件的窗口
      while (start < end && sum / (end - start + 1) > minAverageLost) {
        sum -= arr[start]; // 减去即将离开窗口的值
        start++; // 窗口缩小
      }

      // 最新的长度
      const newLen = end - start + 1;

      console.log(newLen);
      // 当循环结束后，如果符合条件
      if (newLen >= maxLen && sum / newLen <= minAverageLost) {
        if (newLen > maxLen) {
          // 如果找到更长的，则直接清空之前的
          results = [];
          maxLen = newLen;
        }
        results.push(`${start}-${end}`);
      }
    }

    if (results.length) {
      console.log(results.join(" "));
    } else {
      console.log("NULL");
    }
    rl.close();
  }
});
