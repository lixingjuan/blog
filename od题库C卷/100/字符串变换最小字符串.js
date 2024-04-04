/**
 * @题目描述
 * 给定一个字符串 s，最多只能进行一次变换，返回变换后能得到的最小字符串(按照字典 序进行比较)
 * 变换规则: 交换字符串中任意两个不同位置的字符
 *
 * @输入描述
 * 一串小写字母组成的字符串 s
 *
 * @输出描述
 * 按照要求进行变换得到的最小字符串。
 *
 *
 * @用例1
 * 输入
 * abcdef
 * 输出
 * abcdef
 * 说明
 * abcdef已经是最小字符串，不需要交换。
 *
 * @用例2
 * 输入
 * bcdefa
 * 输出
 * acdefb
 * 说明
 * a和b进行位置交换，可以得到最小字符串
 */

function minTransform(s) {
  // 将字符串转换为字符数组，方便操作
  let arr = s.split("");
  // 遍历字符串找到第一个可以交换使字符串变小的位置
  for (let i = 0; i < arr.length - 1; i++) {
    let minChar = arr[i];
    let minIndex = -1;
    // 从当前字符之后找到最小的字符
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < minChar) {
        minChar = arr[j];
        minIndex = j;
      }
    }

    // 如果找到了可以交换的字符
    if (minIndex !== -1) {
      // 找到当前字符之后最小的字符进行交换
      for (let j = i + 1; j < arr.length; j++) {
        // 选择最小且最靠后的字符进行交换
        if (arr[j] === minChar) {
          minIndex = j;
        }
      }
      // 进行交换
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      return arr.join("");
    }
  }
  // 如果没有可以交换的，返回原字符串
  return arr.join("");
}

// 测试用例
console.log(minTransform("abcdef")); // 输出: abcdef
console.log(minTransform("bcdefa")); // 输出: acdefb
