const arr = [1, 2, 3];
const obj = { a: '1', b: 2, c: false, d: undefined, e: null, f: Symbol('f') };
obj.obj = obj;

const copyObj = (source, map = new WeakMap()) => {
  if (["string", "number", "boolean", "undefined", 'symbol'].includes(typeof source)) {
    return source;
  }

  if (source === null) {
    return null
  }

  if (map.has(source)) {
    return map.get(source);
  }

  const res = Array.isArray(source) ? [] : {};
  map.set(source, res);

  for (let i in source) {
    res[i] = copyObj(source[i], map);
  }
  return map.get(source);
};

console.log(copyObj(obj));
