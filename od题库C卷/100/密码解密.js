/**
 * @题目描述
 * 给定一段“密文”字符串只 s，其中字符都是经过“密码本”映射的，现需要将“密文”解密并且输出映射的规则:
 * ·(a-i)分别用(1-9)表示:
 * ·(j-z)分别用( 10*-26*)表示。
 * 约束:映射始终唯一
 *
 * @输入描述
 * “密文”字符串
 * 输出描述
 * 明文字符串
 *
 * @示例
 * 输入：
 * 20*19*20*
 *
 * 输出：
 * tst
 *
 * 说明：
 * 翻译后的文本长度在 100 以内。
 */

function decryptCipherText(s) {
  let plaintext = "";
  let i = 0;

  const aCharCode = "a".charCodeAt(0);
  const jCharCode = "j".charCodeAt(0);
  while (i < s.length) {
    // 处理10*到26*的情况
    if (s[i + 2] === "*") {
      const number = parseInt(s.substring(i, i + 2)); // 提取两位数，不包括*
      plaintext += String.fromCharCode(jCharCode + number - 10); // 转换为字母
      i += 3; // 跳过数字和'*'
    } else {
      // 处理1到9的情况
      const number = parseInt(s[i]);
      plaintext += String.fromCharCode(aCharCode + number - 1); // 转换为字母
      i++; // 移动到下一个字符
    }
  }

  return plaintext;
}

// 测试代码
console.log(decryptCipherText("20*19*20*")); // 应该输出 "tst"
