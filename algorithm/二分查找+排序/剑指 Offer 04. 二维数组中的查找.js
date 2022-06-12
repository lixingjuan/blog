/**
 * @description
 * 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。
 * 请完成一个高效的函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。
 *
 * @method 将矩阵逆时针旋转45度，以右上角作为根节点便利（想象为一个二叉树），左侧小，右侧大，依次和target比较
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var findNumberIn2DArray = function (matrix, target) {
  let i = matrix.length - 1;
  let j = 0;

  while (i >= 0 && j < matrix[0].length) {
    if (matrix[i][j] > target) i--;
    else if (matrix[i][j] < target) j++;
    else return true;
  }
  return false;
};
