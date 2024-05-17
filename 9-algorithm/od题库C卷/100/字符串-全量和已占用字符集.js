/**
 * @题目描述
 * 给定两个字符集合，一个是全量字符集，一个是已占用字符集，已占用字符集中的字符不能再使用。
 * 要求输出剩余可用字符集。
 *
 * @输入描述
 * 输入一个字符串 一定包含@，@前为全量字符集 @后的为已占用字符集
 * 已占用字符集中的字符一定是全量字符集中的字符
 * 字符集中的字符跟字符之间使用英文逗号隔开
 * 每个字符都表示为字符+数字的形式用英文冒号分隔，比如a:1标识一个a字符
 * 字符只考虑英文字母，区分大小写
 * 数字只考虑正整型 不超过100
 * 如果一个字符都没被占用 @标识仍存在，例如 a:3,b:5,c:2@
 *
 * @输出描述
 * 输出可用字符集
 * 不同的输出字符集之间用回车换行
 * 注意 输出的字符顺序要跟输入的一致，如下面用例不能输出b:3,a:2,c:2
 * 如果某个字符已全部占用 则不需要再输出
 *
 *
 * @示例
 * 输入
 * a:3,b:5,c:2@a:1,b:2
 * 输出
 * a:2,b:3,c:2
 * 说明
 * 全量字符集为三个a，5个b，2个c
 * 已占用字符集为1个a，2个b
 * 由于已占用字符不能再使用
 * 因此剩余可用字符为2个a，3个b，2个c
 * 因此输出a:2,b:3,c:2

 */

function getAvailableCharacters(input) {
  // 分割全量字符集和已占用字符集
  const [allChars, usedChars] = input.split("@").map((part) => part.split(",").filter((x) => x));

  // 将字符集转换为对象 {字符: 数量}
  const parseChars = (arr) =>
    arr.reduce((acc, cur) => {
      const [char, count] = cur.split(":");
      acc[char] = parseInt(count, 10);
      return acc;
    }, {});

  const allCharsObj = parseChars(allChars);
  const usedCharsObj = parseChars(usedChars);

  // 计算剩余可用字符集
  for (const char in usedCharsObj) {
    if (allCharsObj[char] !== undefined) {
      allCharsObj[char] -= usedCharsObj[char];
      if (allCharsObj[char] <= 0) {
        delete allCharsObj[char];
      }
    }
  }

  // 构造输出格式，不同的输出字符集之间用回车换行
  return Object.entries(allCharsObj)
    .map(([char, count]) => `${char}:${count}`)
    .join("\n");
}

// 测试用例
console.log(getAvailableCharacters("a:3,b:5,c:2@a:1,b:2")); // 应输出a:2 b:3 c:2，每个结果一行
console.log(getAvailableCharacters("a:3,b:5,c:2@")); // "a:3\nb:5\nc:2"，每个结果一行
console.log(getAvailableCharacters("a:10@")); // "a:10"，单独一行
console.log(getAvailableCharacters("a:3,b:5,c:2@a:3,b:5,c:2")); // 输出空，因为没有可用字符
console.log(getAvailableCharacters("d:4,e:5@e:2,d:1")); // "d:3\ne:3"，每个结果一行
