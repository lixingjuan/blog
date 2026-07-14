/**
 * 支持停止迭代，借鉴jQuery中的处理
 * if(value === false) {
 *    break;
 * }
 */

// 改写之前的each函数
const each = (arr, callback) => {
  for (let i = 0; i < arr.length; i++) {
    if (callback(arr[i], i) === false) {
      break;
    }
  }
};

each([1, 2, 3], (ele, index) => {
  console.log("ele", ele);
  if (ele === 2) {
    return false;
  }
});
