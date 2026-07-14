const root2 = {
  val: 5,
  left: {
    val: 4,
    left: { val: 3 },
    right: { val: 2 },
  },
  right: {
    val: 8,
    left: { val: 6 },
    right: { val: 7 },
  },
};

/* ****************************************************************************************************
 *                                    先序
 ************************************************************************************************* */

const preOrder = function (node) {
  const result = [];
  const preDfs = function (node) {
    if (node) {
      result.push(node.val);
      preDfs(node.left);
      preDfs(node.right);
    }
  };

  preDfs(node);
  return result;
};

console.log(root2);
console.log(preOrder(root2));

/* ****************************************************************************************************
 *                                    中序
 ************************************************************************************************* */

// 结果数组为升序
const minOrder = function (node) {
  const result = [];
  const dfs = function (node) {
    if (node) {
      dfs(node.left);
      result.push(node.val);
      dfs(node.right);
    }
  };

  dfs(node);
  return result;
};

console.log(root2);
console.log(minOrder(root2));
