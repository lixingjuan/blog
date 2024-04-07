/**
 * @题目描述
 * 某公司部门需要派遣员工去国外做项目。
 * 现在，代号为x的国家和代号为y的国家分别需要 cntx 名和 cnty 名员工，部门每个员工有一个员工号(1,2,.)，工号连续，从1开始。
 * 部长派遣员工的规则:
 *    规则1: 从 1，k中选择员工派遣出去
 *    规则2: 编号为 x 的倍数的员工不能去 x 国，编号为 y 的倍数的员工不能去 y 国问题
 * 找到最小的k，使得可以将编号在[1,k]中的员工分配给x国和y国，且满足x国和y国的需求输入描述
 * 四个整数 x,y,cntx,cnty。
 * 2<x<y< 30000
 * x和y 一定是 质数Q
 * 1 < cntx, cnty < 10^9
 * cntx + cnty< 10^9
 *
 * @输出描述
 * 满足条件的最小的 k
 * 示例1:
 * 输入:
 * 2 3 3 1
 * 输出:
 * 5
 * 说明:
 * 输入中:
 * 2 表示国家代号 2
 * 3 表示国家代号 3
 * 3 表示国家 2 需要3 个人
 * 1 表示国家 3 需要1个人
 * 输出的5表示k最小为5
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin, // 标 准 输 入 作 为 输 入 源
  output: process.stdout, // 标 准 输 出 作 为 输 出 源
});

// 当 从 标 准 输 入 中 读 取 到 一 行 数 据 时 触 发
rl.on("line", (line) => {
  // 将 读 取 到 的 行 分 割 成 数 组 ，并 将 其 元 素 转 换 为 数 字
  const [x, y, cntX, cntY] = line.split(" ").map(Number);

  // minID是满足条件的最小员工ID，初始值设置为两个国家需要的员工总数
  let minID = cntX + cntY;

  // maxID是员工ID的可能的最大值
  let maxID = 1000000000;

  // 使用二分查找算法
  while (minID <= maxID) {
    // 计算中间值midID
    const midID = minID + Math.floor((maxID - minID) / 2);

    // 计算在[1,midID]范围内不能去国家X的员工数量
    // !!为什么这么计算？想象把员工例如[1,2,3,4,5,6]，x是3， 把1-6分成3分，每一段的最后一个数字都是3的倍数
    const excludedX = Math.floor(midID / x);

    // 计算在[1,midID]范围内不能去国家Y的员工数量
    const excludedY = Math.floor(midID / y);

    // 计算在[1,midID]范围内既不能去X国也不能去Y国的员工数量
    // !! 这个处理很重要，x和y的最小公倍数
    const excludedBoth = Math.floor(midID / (x * y));

    // 计算国家X实际需要的员工数量
    const neededX = Math.max(0, cntX - (excludedY - excludedBoth));

    // 计算国家Y实际需要的员工数量
    const neededY = Math.max(0, cntY - (excludedX - excludedBoth));

    // 计算总共不能使用的员工数量
    const totalExcluded = midID - excludedX - excludedY + excludedBoth;

    // 判断当前的中间值是否满足条件
    if (neededX + neededY <= totalExcluded) {
      // 如果满足条件，则减小最大的搜索范围
      maxID = midID - 1;
    } else {
      // 如果不满足条件，则增加最小的搜索范围
      minID = midID + 1;
    }
  }
  // 输 出 满 足 条 件 的 最 小 员 工 ID
  console.log(minID);
});
