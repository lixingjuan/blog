const arr = [1, 2, 3];
const obj = { a: '1', b: 2, c: false, d: undefined, e: null, f: Symbol('f') };
obj.obj = obj;

const deepCopy = (source, map = new WeakMap()) => {
  if (['string', 'number', 'boolean', 'undefined', 'symbol'].includes(typeof source) || source === null) {
    return source;
  }

  if (map.has(source)) {
    return map.get(source);
  }

  const res = Array.isArray(source) ? [] : {};
  map.set(source, res);

  for (let i in source) {
    res[i] = deepCopy(source[i], map);
  }

  return map.get(source);
}

console.log(deepCopy(obj));
