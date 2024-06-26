/**
 * @key 只能交易一次
 * @desc 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
 * 你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
 * 返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */

/**
 * @tag 贪心算法
 * @method 只要高于“最小价格”就卖出
 * 循环遍历，更新“最小价格” 和 “最大获利 = max(卖出的获利, 之前的最大获利)”
 */
var makeProfit0 = function (prices) {
  const len = prices.length;

  if (len <= 1) return 0;

  let constant = {
    min: prices[0], // 最小价格，每轮循环都更新
    maxProfit: 0, // 最大获利
  };

  let i = 0;
  while (++i < len) {
    constant.maxProfit = Math.max(constant.maxProfit, prices[i] - constant.min);
    constant.min = Math.min(constant.min, prices[i]);
  }

  return constant.maxProfit;
};

/**
 * @tag 动态规划:这个最容易理解
 * @method 前i天的最大收益 = Math.max{前i-1天的最大收益, 第i天的价格-前i-1天中的最小价格}
 */
function makeProfit1(prices) {
  let len = prices.length;
  // 第index天的收益
  let dp = Array.from({ length: len }).fill(0);
  // 循环遍历中的最小价格
  let minPrice = prices[0];

  for (let i = 1; i < len; i++) {
    const currentPrice = prices[i];

    // 前i天的最大收益 = max{前i-1天的最大收益, 第i天的价格-前i-1天中的最小价格}
    dp[i] = Math.max(dp[i - 1], currentPrice - minPrice);
    minPrice = Math.min(currentPrice, minPrice);
  }

  return dp[len - 1];
}

/**
 * @name 动态规划
 * @method 三维数组分别 [第i天][还可以交易k次][手中是否持有股票]
 * 买卖股票一类问题的状态转移方程
 *
 * i表示天数
 * k表示还可以交易次数 (一次交易，表示可以买卖一次，所以在一种操作上记录即可，此处在买操作记录)
 * 0表示当天结束后，手中无股票
 *
 * dp[i][k][0]
 * i天，还可以交易k次数，手中没有持有股票
 *
 *
 * 第i天可以两种情况=>
 *
 * 今天结束后没有: dp[i][k][0] = Math.max(dp[i-1][k][0],      dp[i-1][k][1] + prices[i])
 *                           = Math.max("昨天无, 今天未操作",  "昨天有, 今天被卖出了")
 *
 * 今天结束后有:   dp[i][k][1] = Math.max(dp[i-1][k][1],      dp[i-1][k-1][0] - prices[i])
 *                           = Math.max("昨天有，今天未操作",   "昨天无，今天买入")
 *
 *
 *
 * 此处k === 1, 只可操作一次，所以
 * 1. k不影响结果，则k变量可以直接删除
 * 2. 结束后，手中无股票最赚钱
 * 3. [k-1], 表示不能再操作了，所以直接去掉该表达式
 *
 *
 * => 最终状态转移方程
 *
 * 今天结束后没有: dp[i][0] = Math.max(dp[i-1][0],      dp[i-1][1] + prices[i])
 *                           = Math.max("昨天无, 今天未操作",  "昨天有, 今天被卖出了")
 *
 * 今天结束后有:   dp[i][1] = Math.max(dp[i-1][1],      - prices[i])
 *                           = Math.max("昨天有，今天未操作",   "昨天无，今天买入")
 *
 *
 *
 */
function makeProfit2(prices) {
  let len = prices.length;
  const dp = Array.from({ length: len }, () => Array.from({ length: 2 }));
  // 先列举出第0天的情况
  dp[0][0] = 0; // 第0天没有
  dp[0][1] = -prices[0]; // 第0天有

  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i]);
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i]);
  }

  return dp[len - 1][0];
}

/**
 * 对makeProfit1进行状态压缩
 *
 * 由于今天的状态只和前一天有关，所以数组第一列也不需要记录
 * 状态转移方程
 * dp[0] = Math.max(dp[0], dp[1] + prices[i]);
 * dp[1] = Math.max(dp[1], -prices[i]);
 */
function makeProfit3(prices) {
  let len = prices.length;

  if (len <= 1) return 0;

  const dp = Array.from({ length: 2 });

  dp[0] = 0;
  dp[1] = -prices[0];

  for (let i = 1; i < len; i++) {
    dp[0] = Math.max(dp[0], dp[1] + prices[i]);
    dp[1] = Math.max(dp[1], -prices[i]);
  }

  return dp[0];
}

/** 💓 对makeProfit3 进行语义化 */
function makeProfit4(prices) {
  let len = prices.length;

  if (len <= 1) return 0;

  let sell = 0;
  let buy = -prices[0];

  for (let i = 1; i < len; i++) {
    sell = Math.max(sell, buy + prices[i]);
    buy = Math.max(buy, -prices[i]);
  }

  return sell;
}

const arr = [7, 1, 5, 3, 6, 4];
const result = 5;
console.log(makeProfit0(arr) === result);
console.log(makeProfit1(arr) === result);
console.log(makeProfit2(arr) === result);
console.log(makeProfit3(arr) === result);
console.log(makeProfit4(arr) === result);
