/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
    if (!s) return 0
    let codes = Array(26).fill(0)  // 记录窗口内各字符出现次数
    let i = 0
    let max = 0
    for(let j = 0; j < s.length; j++){
        let n = s[j].charCodeAt() - 65
        codes[n] += 1
        max = Math.max(max, codes[n])
        if (j - i + 1 > max + k) {  // 移动左边
            codes[ s[i].charCodeAt() - 65 ] -= 1
            i++
        } 
    }
    return s.length - i
};
 

console.log(characterReplacement("ABAB", 2) )