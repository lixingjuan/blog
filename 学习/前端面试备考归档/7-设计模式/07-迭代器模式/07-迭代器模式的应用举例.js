/**
 * 原书中的举例为浏览器的文件上传场景
 *
 * 例如有三把钥匙开门，只有一把是对的
 * 正确的钥匙返回名字，错误的钥匙返回false
 * 做法：一把一把尝试，试对了就使用当前钥匙，并停止继续尝试
 */

const keyA = () => {
  return false;
};
const keyB = () => {
  return "keyB";
};
const keyC = () => {
  return false;
};

/** 遍历钥匙们 */
const iteratorKeys = (arr) => {
  // !! 这个好棒 fn=arr[i++]
  for (let i = 0, fn; (fn = arr[i++]); ) {
    let isReallyKey = fn();
    if (isReallyKey !== false) {
      return isReallyKey;
    }
  }
};

const realyKey = iteratorKeys([keyA, keyB, keyC]);
console.log({ realyKey });
