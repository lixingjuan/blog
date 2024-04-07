/**
 * @题目描述
 * “吃货”和“馋嘴”两人到披萨店点了一份铁盘(圆形)披萨，并嘱咐店员将披萨按放射状切成大小相同的偶数个小块。
 * 但是粗心服务员将披萨切成了每块大小都完全不同奇数块，且肉眼能分辨出大小。
 * 由于两人都想吃到最多的披萨，他们商量了一个他们认为公平的分法:从“吃货”开始，轮流取披萨。
 * 除了第-块披萨可以任意选取以外，其他都必须从缺口开始选。
 * 他俩选披萨的思路不同。
 *  “馋嘴”每次都会选最大块的拨萨，而且“吃货”知道“馋嘴”的想法。
 *  已知披萨小块的数量以及每块的大小，求“吃货”能分得的最大的披萨大小的总和。
 *
 * @输入描述
 * 第1行为一个正整数奇数 N ，表示披萨小块数量。其中 3 ≤ N< 500
 * 接下来的第 2 行到第 N+1 （共 N 行），每行为一个正整数，表示第i块披萨的大小， 1≤i≤N 。
 * 披萨小块从某一块开始，按照一个方向次序顺序编号为 1 ~ N ,每块披萨的大小范围为[1,2147483647]。
 *
 * @输出描述
 * ”吃货“能分得到的最大的披萨大小的总和
 *
 * @示例1
 * 输入：
 * 5
 * 8
 * 2
 * 10
 * 5
 * 7
 *
 * 输出：
 * 19
 *
 * 说明：
 * 此例子中，有 5 块披萨。每块大小依次为 8 、2 、10 、5 、7。
 * 按照如下顺序拿披萨，可以使”吃货拿到最多披萨:
 * “吃货”拿大小为 10 的披萨
 * “馋嘴”拿大小为5的披萨
 * “吃货”拿大小为7 的披萨
 * “馋嘴”拿大小为 8 的披萨
 * ”吃货“拿大小为2 的披萨
 * 至此，披萨瓜分完毕，”吃货“拿到的披萨总大小为 10+7+2=19
 * 可能存在多种拿法，以上只是其中一种。
 */

function greedyPizza(pizzas) {
  // “吃货”总共能吃到的披萨大小
  let total = 0;
  // 1. “吃货”首先选择最大的一块
  const maxPizza = Math.max(...pizzas);
  total += maxPizza;

  // 2. 删除吃货已经吃掉的披萨, 重新构造披萨数组
  const maxPizzaIndex = pizzas.indexOf(maxPizza);
  const pizza1 = pizzas.slice(maxPizzaIndex + 1);
  console.log(pizza1);
  const pizza2 = pizzas.slice(0, maxPizzaIndex);
  console.log(pizza1);
  const newPizzas = [...pizza1, ...pizza2];

  // 然后轮流从两端选择
  let turn = 0; // 0 表示“馋嘴”的回合，1 表示“吃货”的回合
  while (newPizzas.length > 0) {
    const first = newPizzas[0];
    const last = newPizzas.at(-1);

    // “馋嘴”的回合，选择两端最大的
    if (turn === 0) {
      newPizzas.splice(first > last ? 0 : newPizzas.length - 1, 1);
    } else {
      // “吃货”的回合，选择两端较大的
      let choice = first > last ? first : last;
      newPizzas.splice(first > last ? 0 : newPizzas.length - 1, 1);
      total += choice;
    }
    turn = 1 - turn; // 轮换回合
  }

  return total;
}

// 示例
// console.log(greedyPizza([1, 1]));
// console.log(greedyPizza([1, 1, 1]));
// console.log(greedyPizza([1, 2]));
// console.log(greedyPizza([2, 2]));
// console.log(greedyPizza([1, 2, 1]));
// console.log(greedyPizza([8, 2, 10, 5, 7]));
console.log(greedyPizza([100, 3, 7, 5]));
