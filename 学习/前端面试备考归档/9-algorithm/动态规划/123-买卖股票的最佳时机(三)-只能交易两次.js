/**
 * @key 只能交易两次
 *
 * 给定一个数组，它的第 i 个元素是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 两笔 交易。
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */

/**
 * @tag 动态规划
 * @method 由于k为2，所以不能直接去掉，在“股票（一）基础上”对k进行循环
 */
const maxProfit = function (prices) {
  let n = prices.length;

  let buy1 = -prices[0];
  let sell1 = 0;

  let buy2 = -prices[0];
  let sell2 = 0;

  for (let i = 1; i < n; i++) {
    sell2 = Math.max(sell2, buy2 + prices[i]);
    buy2 = Math.max(buy2, sell1 - prices[i]);
    sell1 = Math.max(sell1, buy1 + prices[i]);
    buy1 = Math.max(buy1, -prices[i]);
  }
  return sell2;
};

const arr = [3, 3, 5, 0, 0, 3, 1, 4];
const result = 6;

console.log(maxProfit(arr) === result);
