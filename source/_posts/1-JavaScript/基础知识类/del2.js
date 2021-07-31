/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function (s) {
  const string = s || "";
  if (string.length <= 1) {
    return s;
  }

  // 最长字符串
  const stringArr = string.split("");
  let maxString = "";
  for (let index = 0; index < stringArr.length; index++) {
    const it = stringArr[index];
    const beforeArr = stringArr.slice(0, index);

    if (!beforeArr.includes(it)) {
      continue;
    }

    const firstPosition = stringArr.findIndex((inner) => inner === it);
    const currentSring = stringArr.slice(firstPosition, index + 1).join("");

    if (currentSring.length === maxString.length) {
      continue;
    }

    if (currentSring.length > maxString.length) {
      maxString = currentSring;
    }
  }

  return maxString || stringArr[0];
};

console.log(longestPalindrome("cbbd") === "bb");
console.log(longestPalindrome("c") === "c");
console.log(longestPalindrome("babad") === "bab");
