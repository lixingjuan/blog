/**
 * @题目描述
 * 从前有个村庄，村民们喜欢在各种田地上插上小旗子，旗子上标识了各种不同的数字。某天集体村民决定将覆盖相同数字的最小矩阵形的土地分配给村里做出巨大贡献的村民，请问此次分配土地，做出贡献的村民种最大会分配多大面积?
 *
 * @输入描述
 * 第一行输入 m 和 n,
 * ·m 代表村子的土地的长
 * ·n代表土地的宽
 * 第二行开始输入地图上的具体标识
 *
 * @输出描述
 * 此次分配土地，做出贡献的村民种最大会分配多大面积
 *
 * @备注
 * 旗子上的数字为1~500，土地边长不超过500
 * 未插旗子的土地用0标识
 *
 * @用例1
 * 输入
 * 3 3
 * 1 0 1
 * 0 0 0
 * 0 1 0
 * 输出
 * 1 9
 * 说明
 * 土地上的旗子为1，其坐标分别为(0.0)，(2,1)以及(0,2)，为了覆盖所有旗子，矩阵需要覆盖的横坐标为0和2，纵坐标为0和2，所以面积为9，即(2-0+1)*(2-0+1)=9
 *
 * @用例2
 * 输入
 * 3
 * 1 0 2
 * 0 0 0
 * 0 3 4
 * 输出
 * 1
 * 说明
 * 由于不存在成对的小旗子，故而返回1，即一块土地的面积。
 */

function maxAreaOfLand(m, n, lands) {
  // 用来记录每个数字的最大最小行列坐标
  const coords = new Map();

  // 遍历土地
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      const num = lands[i][j];
      if (num !== 0) {
        // 只处理非零数字
        if (!coords.has(num)) {
          coords.set(num, { minRow: i, maxRow: i, minCol: j, maxCol: j });
        } else {
          const coord = coords.get(num);
          coord.minRow = Math.min(coord.minRow, i);
          coord.maxRow = Math.max(coord.maxRow, i);
          coord.minCol = Math.min(coord.minCol, j);
          coord.maxCol = Math.max(coord.maxCol, j);
        }
      }
    }
  }

  // 计算每个数字的最小矩阵面积，并找出最大面积
  let maxArea = 1; // 至少是1
  for (let [_, { minRow, maxRow, minCol, maxCol }] of coords) {
    const area = (maxRow - minRow + 1) * (maxCol - minCol + 1);
    maxArea = Math.max(maxArea, area);
  }

  return maxArea;
}

// 用例测试
const m = 3,
  n = 3;
const lands = [
  [1, 0, 1],
  [0, 0, 0],
  [0, 1, 0],
];
console.log(maxAreaOfLand(m, n, lands)); // 输出应该为9

const lands2 = [
  [1, 0, 2],
  [0, 0, 0],
  [0, 3, 4],
];
console.log(maxAreaOfLand(3, 3, lands2)); // 输出应该为1
