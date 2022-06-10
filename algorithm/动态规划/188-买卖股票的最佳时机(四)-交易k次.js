/**
 * @key 限定交易次数k
 * 给定一个整数数组 prices ，它的第 i 个元素 prices[i] 是一支给定的股票在第 i 天的价格。
 * 设计一个算法来计算你所能获取的最大利润。你最多可以完成 k 笔交易。
 *
 * 注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */

function maxProfit(k, prices) {
  const n = prices.length;

  let profit = [];

  for (let i = 0; i <= k; i++) {
    profit.push({
      sell: 0, // 表示没有股票
      buy: -prices[0], // 表示有股票
    });
  }

  for (let i = 0; i < n; i++) {
    for (let j = 1; j <= k; j++) {
      // 在无限次交易的基础哈桑，加一层k循环
      // sell = Math.max(sell, buy + prices[i]),
      // bug = Math.max(buy, -prices[i])
      profit[j] = {
        sell: Math.max(profit[j].sell, profit[j].buy + prices[i]),
        buy: Math.max(profit[j].buy, profit[j - 1].sell - prices[i]),
      };
    }
  }

  console.log(profit);
  return profit[k].sell;
}

let theK = 2;
let thePrices = [2, 4, 1];

console.log(maxProfit(theK, thePrices));
