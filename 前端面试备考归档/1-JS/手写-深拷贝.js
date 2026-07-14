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
/**
 * 使用WeapMap的原因
 * 1. 避免循环引用导致的无限递归
 * 2. 利用WeakMap弱引用的特性，不会阻止垃圾收集器回收它们所引用的对象
 */

/** 实现一个深拷贝 */
const deepCopy = (target, hash = new WeakMap()) => {
  if (target === null) return null;
  if (target instanceof Date) return new Date(target);
  if (target instanceof RegExp) return new RegExp(target);
  if (typeof target !== "object") return target;

  if (hash.has(target)) return hash.get(target);

  const clone = Array.isArray(target) ? [] : {};
  hash.set(target, clone);
  Object.keys(target).forEach((key) => {
    clone[key] = deepCopy(target[key], hash);
  });

  return hash.get(target);
};
