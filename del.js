/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const string = s ?? '';

  if (string.length <= 1) {
    return string.length
  }

  const arrSring = Array.from(string)

  let maxLength = 0;

  let arr = [];


  for (let index = 0; index < arrSring.length; index++) {
    const it = arrSring[index];
    if (!arr.length) {
      arr.push(it)
      maxLength = 1
    } else {
      // 最后出现的索引
      const lastIndex = arr.lastIndexOf(it)

      // 1. 如果没有出现过
      if (lastIndex < 0) {
        arr.push(it);
        maxLength = Math.max(arr.length, maxLength)
      } else {
        // 2. 出现过，则将其最后出现的位置之前及其本身都删除
        arr.splice(0, lastIndex + 1)
        arr.push(it)
        maxLength = Math.max(arr.length, maxLength)
      }
    }
  }


  return maxLength
};


// console.time('hhhh')
console.log(lengthOfLongestSubstring("abcabcbb")) // 3
console.log(lengthOfLongestSubstring("bbbbb"))  // 1
console.log(lengthOfLongestSubstring("pwwkew")) // 3
console.log(lengthOfLongestSubstring("  "))   // 2
console.log(lengthOfLongestSubstring("cbb"))    // 2
console.log(lengthOfLongestSubstring("aab"))    // 2
console.log(lengthOfLongestSubstring("dvdf"))   // 3
// console.timeEnd('hhhh')