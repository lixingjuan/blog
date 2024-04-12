/** od考试的并查集的题 */
class UnionFind {
  constructor() {
    this.root = new Map();
  }

  find(x) {
    if (this.root.has(x)) {
      return this.root.get(x);
    }

    if (this.root.get(x) === x) {
      return x;
    }

    // 路径压缩
    this.root.set(x, this.root.get(x));
    return this.root.get(x);
  }
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);
    if (rootX !== rootY) {
      this.root.set(rootX, rootY);
    }
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

const uf = new UnionFind();
uf.union("1", "2");
uf.union("3", "2");
console.log(uf.connected("1", "3"));

const sameArr = ["五", "5", "⑤", "伍", "wu"];

const firstEle = sameArr[0];
for (let i = 1; i < sameArr.length; i++) {
  uf.union(firstEle, sameArr[i]);
}
console.log(uf.connected("5", "⑤"));

// 林汉达上下五千年
// 林汉达上下5千年
// 期望输出：五 5

const demo = (str1, str2) => {
  const sameResult = []; // 相似的结果
  const diffResult = []; // 不相同的结果

  // TODO: 其中一个字符串为空

  // 幸福de猪的个人专辑
  // 幸福的猪的个人专辑
  // 得 的
  // 得 de
  // 两个字符串进行遍历
  let left = 0;
  const len = Math.max(str1.length, str2.length);
  console.log(len);
  while (!!str1.length || !!str2.length) {
    if (str1[left] === str2[left]) {
      continue;
    }
  }

  while (left < len) {
    // TODO: 如果指针已经超出某个边界
    const a = str1[left];
    const b = str2[left];

    console.log({ a, b });

    if (a === b) {
      left++;
      continue;
    }

    // 不相等的情况需要考虑，
    // 1. 有相似字符
    if (sameStrMap.has(str1[left])) {
      const other = sameStrMap.get(str1[left]).find((it) => {
        return str2[left].substring(left).indexOf(it);
      });
      console.log(other);
      if (other > 0) {
        sameResult.push(`${str1[left]} ${other}`);
        left += other.length;
      } else {
        left++;
      }
      continue;
    }

    // 2. 有相似字符
    if (sameStrMap.has(str1[left])) {
      const other = sameStrMap.get(str1[left]).find((it) => {
        return str1[left].substring(left).indexOf(it);
      });
      console.log(other);
      if (other > 0) {
        sameResult.push(`${str1[left]} ${other}`);
        left += other.length;
      } else {
        left++;
      }
      continue;
    }

    // 3. 有*， 需要找到下一个相等的字符串，*需要匹配一段
    if (sameStrMap.has("*")) {
      let fastP = left;
      // 有可能已经出边界
      while (str1[fastP] !== str2[fastP] && fastP < Math.max(str1.length, str2.length)) {
        fastP++;
      }
      // fastP指针，寻找下一个相同的字符串
      sameResult.push(`${str1.substring(left, fastP)} ${str2.substring(left, fastP)}`);
      left = fastP;

      continue;
    }

    // 4. 完全不相同（没相似、没有*）
    let fastP = left;
    while (str1[fastP] !== str2[fastP] && fastP < Math.max(str1.length, str2.length)) {
      fastP++;
    }
    left = fastP;
    diffResult.push(`${str1.substring(left, fastP)} ${str2.substring(left, fastP)}`);
  }

  if (sameResult.length > 0) {
    console.log("True");
    sameResult.forEach((it) => {
      console.log(it);
    });
  } else if (diffResult.length > 0) {
    console.log("False", diffResult);
    diffResult.forEach((it) => {
      console.log(it);
    });
  }
};

// 幸福de猪的个人专辑
//
["得 的", "得 de"].forEach((it) => addSameStrToMap(it));
console.log(sameStrMap);

demo("幸福de猪的个人专辑", "幸福的猪的个人专辑");
