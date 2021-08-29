// const deepClone = function (source, map = new Map()) {
//   if (typeof source !== "object") {
//     return source;
//   }

//   // 如果map里已经存有该值，直接返回即可, 为了解决循环引用问题
//   if (map.get(source)) {
//     // console.log("11");
//     /* console.log("source", source); */
//     return map.get(source);
//   }

//   const target = Array.isArray(source) ? [] : {};
//   map.set(source, target);
//   console.log("map.get(source)", map.get(source));

//   // 对source 上所有的key 便利clone
//   for (const [key, value] of Object.entries(source)) {
//     target[key] = deepClone(value, map);
//   }
//   return target;
// };

// let item = { person: { name: 6, age: 6 } };
// const res = deepClone([item, item]);

// console.log(res);

let a = JSON.stringify({ person: function () {}, name: { age: 1 } });
console.log(a);
