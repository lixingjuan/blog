/**
 * @key 不限制交易次数
 *
 * 假设你有一个数组prices，长度为n，其中prices[i]是某只股票在第i天的价格，请根据这个价格数组，返回买卖股票能获得的最大收益
 * 1. 你可以多次买卖该只股票，但是再次购买前必须卖出之前的股票
 * 2. 如果不能获取收益，请返回0
 * 3. 假设买入卖出均无手续费
 *
 * 计算最大收益
 * @param prices int整型一维数组 股票每一天的价格
 * @return int整型
 *
 * 思路：只要涨就卖
 */
/**
 * @tag 贪心算法
 * @method 只要当天价格高于前一天就卖出
 */
function maxProfit0(prices) {
  let profit = 0;

  for (let i = 1; i < prices.length; i++) {
    const diff = prices[i] - prices[i - 1];
    if (diff > 0) {
      profit = profit + diff;
    }
  }
  return profit;
}

/**
 * @tag 动态规划
 * @method 由于次数不限制，所以在(一)的基础上去掉影响变量k即可得到状态转移方程
 * dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
 * dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] - prices[i])
 *
 * 状态压缩，同样dp[i] 只和 dp[i - 1] 有关，去掉一维
 */
function maxProfit1(prices) {
  let n = prices.length;
  let dp = Array.from(new Array(n), () => new Array(2));
  dp[0] = 0;
  dp[1] = -prices[0];
  for (let i = 1; i < n; i++) {
    dp[0] = Math.max(dp[0], dp[1] + prices[i]);
    dp[1] = Math.max(dp[1], dp[0] - prices[i]);
  }
  return dp[0];
}

/** 语义化 */
function maxProfit2(prices) {
  let n = prices.length;
  let sell = 0;
  let buy = -prices[0];

  for (let i = 1; i < n; i++) {
    sell = Math.max(sell, buy + prices[i]);
    buy = Math.max(buy, sell - prices[i]);
  }
  return sell;
}

const arr = [7, 1, 5, 3, 6, 4];
const result = 7;

console.log(maxProfit0(arr) === result);
console.log(maxProfit1(arr) === result);
console.log(maxProfit2(arr) === result);
