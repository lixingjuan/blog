/**
 * @题目描述
 * 攀登者喜欢寻找各种地图，并且尝试攀登到最高的山峰。
 * 地图表示为一维数组，数组的索引代表水平位置，数组的元素代表相对海拔高度。其中数组元素0代表地面。
 * 例如：[0,1,2,4,3,1,0,0,1,2,3,1,2,1,0]，代表如下图所示的地图，
 * 地图中有两个山脉位置分别为 1,2,3,4,5 和 8,9,10,11,12,13，最高峰高度分别为 4,3。最高峰位置分别为3,10。
 * 一个山脉可能有多座山峰(高度大于相邻位置的高度，或在地图边界且高度大于相邻的高度)。
 *
 *
 * 登山时会消耗登山者的体力(整数)，
 *
 * 上山时，消耗相邻高度差两倍的体力
 * 下山时，消耗相邻高度差一倍的体力
 * 平地不消耗体力
 * 登山者体力消耗到零时会有生命危险。
 *
 * 例如，上图所示的山峰：
 *
 * 从索引0，走到索引1，高度差为1，需要消耗 2 * 1 = 2 的体力，
 * 从索引2，走到索引3，高度差为2，需要消耗 2 * 2 = 4 的体力。
 * 从索引3，走到索引4，高度差为1，需要消耗 1 * 1 = 1 的体力。
 *
 * 攀登者想要评估一张地图内有多少座山峰可以进行攀登，且可以安全返回到地面，且无生命危险。
 *
 */

/** !!网上没找到题目详细描述，这里先按照爬所有山峰需要消耗多少体力解题 */

function calculateTotalEnergy(map) {
  let totalEnergy = 0; // 初始化总体力消耗为0

  for (let i = 1; i < map.length; i++) {
    const curHeight = map[i];
    const preHeight = map[i - 1];
    // 计算相邻高度差
    const heightDiff = curHeight - preHeight;

    // 判断当前是上山还是下山
    if (heightDiff > 0) {
      // 上山，消耗相邻高度差两倍的体力
      totalEnergy += 2 * heightDiff;
    } else if (heightDiff < 0) {
      // 下山，消耗相邻高度差一倍的体力
      totalEnergy += Math.abs(heightDiff);
    }
    // 对于平地，不需要额外的体力消耗
  }

  return totalEnergy;
}

// 示例测试
console.log(calculateTotalEnergy([0, 1, 2, 4, 3, 1, 0, 0, 1, 2, 3, 1, 2, 1, 0]) === 24); // 输出应该是总体力消耗
// 单个山峰
console.log(calculateTotalEnergy([0, 1, 2, 3, 2, 1, 0]) === 9); // 3上山 + 3下山

// 连续的上升和下降
console.log(calculateTotalEnergy([0, 2, 0, 2, 0]) === 12); // 两次上山下山

// 多个山峰
console.log(calculateTotalEnergy([0, 3, 0, 2, 0, 1, 0]) === 18); // 3 + 2 + 1 上山下山

// 平地
console.log(calculateTotalEnergy([0, 0, 0, 0]) === 0); // 无消耗

// 连续平地
console.log(calculateTotalEnergy([1, 1, 1, 1, 1]) === 0); // 无消耗

// 陡峭山峰
console.log(calculateTotalEnergy([0, 5, 0]) === 15); // 5上山 + 5下山

// 轻微起伏
console.log(calculateTotalEnergy([0, 1, 0, 1, 0]) === 6); // 上山下山
