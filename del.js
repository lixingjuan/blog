// /**
//  * Definition for a binary tree node.
//  * function TreeNode(val, left, right) {
//  *     this.val = (val===undefined ? 0 : val)
//  *     this.left = (left===undefined ? null : left)
//  *     this.right = (right===undefined ? null : right)
//  * }
//  */
// /**
//  * @param {TreeNode} root
//  * @param {number} k
//  * @return {number}
//  */
// var kthSmallest = function (root, k) {
//   const stack = [];
//   while (root != null || stack.length) {
//     while (root != null) {
//       stack.push(root);
//       root = root.left;
//     }

//     root = stack.pop();
//     --k;

//     if (k === 0) {
//       break;
//     }
//     root = root.right;
//   }
//   return root.val;
// };

// console.log(kthSmallest());

let outer = 2;
while (outer--) {
  console.log({ outer });
  let inner = 3;
  while (inner > 0) {
    console.log({ inner });
    inner--;
    if (inner === 1) {
      break;
    }
  }
}
