/**
 * @题目描述
 * 疫情期间，小明隔离在家，百无聊赖，在纸上写数字玩。他发明了一种写法:
 * 给出数字个数n和行数m (0 < n <= 999，0 < m <= 999)，从左上角的1开始，按照顺时针螺旋向内写方式，依次写出2,3...n，最终形成一个m行矩阵。
 *
 * 小明对这个矩阵有些要求:
 * - 每行数字的个数一样多
 * - 列的数量尽可能少
 * - 填充数字时优先填充外部
 * - 数字不够时，使用单个*号占位
 *
 * @输入描述
 * 两个整数，空格隔开，依次表示n、m
 *
 * @输出描述
 * 符合要求的唯一矩阵
 *
 * @示例1
 * 输入：
 * 9 4
 *
 * 输出：
 * 1 2 3
 * * * 4
 * 9 * 5
 * 8 7 6
 *
 * 说明：
 * 9个数字写成4行，最少需要3列
 */

function createSpiralMatrix(n, m) {
  // 计算所需的列数
  const cols = Math.ceil(n / m);
  // 初始化矩阵
  const matrix = Array.from({ length: m }, () => Array(cols).fill("*"));
  // 螺旋填充数字
  let num = 1,
    top = 0,
    bottom = m - 1,
    left = 0,
    right = cols - 1;

  while (num <= n) {
    // 向右填充
    for (let i = left; i <= right && num <= n; i++) matrix[top][i] = num++;
    top++;
    // 向下填充
    for (let i = top; i <= bottom && num <= n; i++) matrix[i][right] = num++;
    right--;
    // 向左填充
    for (let i = right; i >= left && num <= n; i--) matrix[bottom][i] = num++;
    bottom--;
    // 向上填充
    for (let i = bottom; i >= top && num <= n; i--) matrix[i][left] = num++;
    left++;
  }
  return matrix;
}

// 将矩阵格式化为字符串输出
function printMatrix(matrix) {
  return matrix.map((row) => row.join(" ")).join("\n");
}

const matrix = createSpiralMatrix(9, 4);
console.log(printMatrix(matrix));
