/**
 * @题目描述
 * 绘图机器的绘图笔初始位置在原点（0, 0），机器启动后其绘图笔按下面规则绘制直线：
 * 1）尝试沿着横向坐标轴正向绘制直线，直到给定的终点值E。
 * 2）期间可通过指令在纵坐标轴方向进行偏移，并同时绘制直线，偏移后按规则1绘制直线；指令的格式为 [X offsetY，表示在横坐标X 沿纵坐标方向偏移，offsetY为正数表示正向偏移，为负数表示负向偏移。]
 *
 * 给定了横坐标终点值E、以及若干条绘制指令，请计算绘制的直线和横坐标轴、以及 X=E 的直线组成图形的面积。
 *
 * @输入描述
 * 首行为两个整数N E，表示有N条指令，机器运行的横坐标终点值E；
 * 接下来N行，每行两个整数表示一条绘制指令X offsetY，用例保证横坐标X以递增排席方式出现，目不会出现相同横坐标X；
 * 取值范围: 0<N<=10000，0<= X<=E<=20000,-10000 <= offsetY <= 10000。
 *
 * @输出描述
 * 一个整数，表示计算得到的面积，用例保证，结果范围在0~4294967295内
 *
 * @示例1
 * 输入：
 * 4 10
 * 1 1
 * 2 1
 * 3 1
 * 4 -2
 *
 * 输出：
 * 12
 *
 * 示例2
 * 输入：
 * 2 4
 * 0 1
 * 2 -2
 *
 * 输出：
 * 4
 */

const demo = (arr, targetX) => {
  const thePosArr = [[0, 0]];

  // 第一遍遍历，得到每个坐标的位置
  for (let i = 0; i < arr.length; i++) {
    const [, preY] = thePosArr[i];
    const [curX, curYOffset] = arr[i];
    thePosArr.push([curX, preY + curYOffset]);
  }

  thePosArr.push([targetX, thePosArr.at(-1)[1]]);

  let sumArea = 0;

  // 第二次遍历，组装面积
  for (let i = 1; i < thePosArr.length; i++) {
    const [prevX, prevY] = thePosArr[i - 1]; // 前一个位置的坐标
    const [curX] = thePosArr[i];
    // 如果前一个位置的y高，则使用前一个位置的y作为height
    const yHeight = Math.abs(prevY);

    const curArea = yHeight * (curX - prevX);
    sumArea += curArea;
  }

  return sumArea;
};

console.log(
  demo(
    [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, -2],
    ],
    10
  ) === 12
);

console.log(
  demo(
    [
      [0, 1],
      [2, -2],
    ],
    4
  ) === 4
);

// 测试用例1: 没有偏移，直线沿X轴正向绘制
console.log(
  demo(
    [
      [2, 0],
      [4, 0],
    ],
    5
  ) === 0
);

// 测试用例2: 单一方向偏移
console.log(
  demo(
    [
      [1, 1],
      [3, 2],
    ],
    4
  ) === 5
);

// 测试用例3: 交替方向的偏移
console.log(
  demo(
    [
      [1, 1],
      [2, -2],
      [3, 3],
    ],
    4
  ) === 4
);

// 测试用例4: 偏移后返回原点
console.log(
  demo(
    [
      [1, 1],
      [2, -1],
    ],
    3
  ) === 1
);

// 测试用例5: 多个偏移
console.log(
  demo(
    [
      [1, 2],
      [3, -1],
      [4, 2],
      [5, -3],
    ],
    6
  ) === 8
);
