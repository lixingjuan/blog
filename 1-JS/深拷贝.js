/* ****************************************************************************************************
 * JSON方法仅支持三种类型的值
 * 1. 原始值：string, number, boolean, null
 * 2. 数组
 * 3. 对象
 ************************************************************************************************* */

/* ****************************************************************************************************
 *                                    实现1: JSON.stringify()
 ************************************************************************************************* */

// 1. string, number, boolean, null外的其他数据类型，作为成员，会被转为null
console.log(JSON.stringify([undefined])); // [null]
console.log(JSON.stringify([() => {}])); // [null]

// 2. string, number, boolean, null外的其他数据类型，作为值，会直接丢失
console.log(JSON.stringify({ name: undefined })); // {}
console.log(JSON.stringify({ name: () => {} })); // {}

// 3. 循环引用会报错

/* ****************************************************************************************************
 *                                    实现2: 递归
 ************************************************************************************************* */

const obj = {
  name: 1,
  arr: [],
};
const deepCopy = (source, map = new WeakMap()) => {
  /**
   * 1. 6种基本数据类型，直接返回
   * 2. 引用数据类型（对象和数组区别处理），则使用weakMap存储
   */

  const isSimpleType =
    ["string", "number", "boolean", "undefined", "symbol"].includes(typeof source) ||
    source === null;

  if (isSimpleType) {
    return source;
  }

  if (map.has(source)) {
    return map.get(source);
  }

  const result = Array.isArray(source) ? [] : {};
  map.set(source, result);

  for (let i in source) {
    result[i] = deepCopy(source[i], map);
  }

  return map.get(source);
};

console.log(deepCopy(obj));

/* ****************************************************************************************************
 * 拓展： 为什么使用weakMap?
 * 1. weakMap的key只能是对象（null除外）
 * 2. weakMap的key是弱引用，不会阻止垃圾回收机制的回收
 * (3. weakMap只有四个方法，不支持遍历)
 ************************************************************************************************* */
