/**
 * @题目描述
 * 寿司店周年庆，正在举办优惠活动回馈新老客户。
 * 寿司转盘上总共有 n盘寿司，prices] 是第i盘寿司的价格
 * 如果客户选择了第i盘寿司，寿司店免费赠送客户距离第i盘寿词最近的下一盘寿司j，前提是 pricesl< pricesi，如果没有满足条件的j则不赠送寿司。
 * 每个价格的寿司都可无限供应。
 *
 * @输入描述
 * 输入的每一个数字代表每盘寿司的价格，每盘寿司的价格之间使用空格进行分隔
 * 3 15 6 14
 * 表示:
 * ·第0盘寿司价格 prices[0]为 3
 * ·第1盘寿司价格 prices[1]为 15
 * ·第 2 盘寿司价格 prices[2]为 6。
 * ·第3盘寿司价格 prices[3]为 14
 * 寿司的盘数n范围为:1≤n≤500
 * 每盘寿司的价格 price 范围为:1≤price≤1000
 *
 * @输出描述
 * 输出享受优惠后的一组数据，每个值表示客户选择第i盘寿司时实际得到的寿司的总价格。使用空格进行分隔，例如:
 * 3 21 9 17
 */

function findDiscountedPrices(prices) {
  // 用于存储最终的结果
  let result = [];

  // 遍历每盘寿司
  for (let i = 0; i < prices.length; i++) {
    let currentPrice = prices[i];
    let found = false; // 标记是否找到符合条件的寿司

    // 查找价格低于当前寿司且最接近的寿司
    for (let j = i + 1; j < prices.length + i - 1; j++) {
      const priceIndex = j % prices.length;
      if (prices[priceIndex] < currentPrice) {
        result.push(currentPrice + prices[priceIndex]);
        found = true;
        break;
      }
    }
    if (!found) {
      result.push(currentPrice);
    }
  }

  return result;
}

// 测试代码
const prices = [3, 15, 6, 14];
console.log(findDiscountedPrices(prices).join(" "));
