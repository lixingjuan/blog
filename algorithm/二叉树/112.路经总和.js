/**
 * 给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
 * 判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
 * 如果存在，返回 true ；否则，返回 false 。
 * 叶子节点 是指没有子节点的节点。
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function TreeNode(val) {
  this.val = val === undefined ? 0 : val;
  this.left = val.left ? new TreeNode(val.left) : null;
  this.right = val.right ? new TreeNode(val.right) : null;
}

/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false;
  if (!root.left && !root.right && targetSum === root.val) return true;
  return (
    hasPathSum(root.left, targetSum - root.val) || hasPathSum(root.right, targetSum - root.val)
  );
};

const tree = {
  val: 5,
  left: {
    val: 4,
    left: {
      val: 11,
      left: {
        val: 7,
      },
      right: {
        val: 2,
      },
    },
    right: {
      val: 8,
    },
  },
  right: {
    val: 8,
    left: {
      val: 13,
    },
    right: {
      val: 4,
      right: {
        val: 1,
      },
    },
  },
};

const myTree = new TreeNode(tree);

//                   5
//         4                   8
//   11      null          13      4
// 7   2                null null   null  1
console.log(hasPathSum(myTree, 22));
