const { each } = require("./02-实现自己的迭代器");

/**
 * 内部迭代器：内部定义好了迭代规则，完全接手整个迭代过程，外部只需要一次调用
 *
 * 缺点：由于迭代规则已经提前规定，02的each函数就无法同时迭代两个数组
 */

/* ****************************************************************************************************
 *                                    demo1. 内部迭代器
 ************************************************************************************************* */

const compare = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  each(arr1, (item, index) => {
    if (arr2[index] !== item) {
      throw new Error("arr1 和 arr2不相等");
    }
  });
  console.log("arr1 和 arr2相等");
};

console.log(compare([1, 2, 3], [1, 2, 3]));
console.log(compare([1, 2, 3], [2, 3]));
console.log(compare([1, 1, 3], [1, 1, 2]));

/* ****************************************************************************************************
 *                                    demo2. 外部迭代器
 ************************************************************************************************* */
const Iterator = function (obj) {
  let current = 0;

  let next = function () {
    current++;
  };

  let isDone = function () {
    return current >= obj.length;
  };

  let getCurrItem = function () {
    return obj[current];
  };

  return {
    next,
    isDone,
    getCurrItem,
  };
};

// 改写compare函数
const compare2 = function (iterator1, iterator2) {
  while (!iterator1.isDone() && !iterator2.isDone()) {
    if (iterator1.getCurrItem() !== iterator2.getCurrItem()) {
      throw new Error("iterator1 和 iterator2 不相等");
    }
    iterator1.next();
    iterator2.next();
  }

  console.log("iterator1 和 iterator2 相等");
};

compare2(Iterator([1, 2, 3]), Iterator([1, 2, 3]));
compare2(Iterator([1, 3, 3]), Iterator([1, 2, 3]));
