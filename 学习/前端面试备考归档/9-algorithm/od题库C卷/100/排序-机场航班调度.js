/**
 * @题目描述
 * XX市机场停放了多架飞机，每架飞机都有自己的航班号CA3385，CZ6678，SC6508等，航班号的前2个大写字母(或数字)代表航空公司的缩写，后面4个数字代表航班信息
 * 但是XX市机场只有一条起飞跑道，调度人员需要安排目前停留在机场的航班有序起飞。
 * 为保障航班的有序起飞飞，调度员首先按照航空公司的缩写(航班号前2个字母)对所有航班进行排序，同一航空公司的航班再按照航班号的后4个数字进行排序，最终获得安排好的航班的起顺序。
 *
 * 请编写一段代码根据输入的航班号信息帮助调度员输出航班的起飞顺序。
 * 说明：
 * 航空公司缩写排序按照从特殊符号a$&*，0~9，A~Z排序;
 *
 * @输入描述
 * 第一行输入航班信息，多个航班号之间用逗号(“，”)分隔，输入的航班号不超过100个
 * 例如:
 * CA3385,CZ6678,SC6508,DU7523,HK4456,MK0987
 * 备注:航班号为6位长度，后4位为纯数字，不考虑存在后4位重复的场景
 *
 * @输出描述
 * CA3385,CZ6678,DU7523,HK4456,MK0987,SC6508
 */

console.log(["$", "*", "&", "a", "b"].sort((a, b) => a.localeCompare(b)));

const demo = (line) => {
  let order = "$&*0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  return line
    .split(",")
    .sort((s1, s2) => {
      for (let i = 0; i < 2; i++) {
        let diff = order.indexOf(s1[i]) - order.indexOf(s2[i]);
        if (diff !== 0) {
          return diff;
        }
        return parseInt(s1.slice(2), 10) - parseInt(s2.slice(2), 10);
      }
    })
    .join(",");
};

/**
 * !! 错误示例，因为
 * console.log(["$", "*", "&", "a", "b"].sort((a, b) => a.localeCompare(b)));
 * === [ '*', '&', '$', 'a', "b" ]
 * 题目要求：a$&*
 */
const demo2 = (line) => {
  const arr = line.split(",");

  return arr
    .sort((a, b) => {
      if (a.slice(0, 2) === b.slice(0, 2)) {
        return parseInt(a.substring(2), 10) - parseInt(b.substring(2), 10);
      }
      return a.slice(0, 2).localeCompare(b.slice(0, 2));
    })
    .join(",");
};

console.log(
  demo("CA3385,CZ6678,SC6508,DU7523,HK4456,MK09") === "CA3385,CZ6678,DU7523,HK4456,MK09,SC6508"
);

// 测试用例 1: 基本测试
console.log(
  demo("CA3385,CZ6678,SC6508,DU7523,HK4456,MK0987") === "CA3385,CZ6678,DU7523,HK4456,MK0987,SC6508"
);

// 测试用例 2: 特殊字符排序
console.log(demo("$A1234,*B5678,0C9012"));
console.log(demo2("$A1234,*B5678,0C9012") === "$A1234,*B5678,0C9012");

// 测试用例 3: 相同航空公司缩写，不同航班信息
console.log(demo("CA1234,CA2345,CA3456") === "CA1234,CA2345,CA3456");

// 测试用例 4: 单个航班号
console.log(demo("CA3385") === "CA3385");

// 测试用例 5: 不同航空公司缩写排序
console.log(demo("BA1234,AA1234") === "AA1234,BA1234");
