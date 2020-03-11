const obj = {
  name: "hong",
  age: 23
};
console.log(Object.getOwnPropertyDescriptors(obj));
// {
//   name: {
//     value: 'hong',
//     writable: true,
//     enumerable: true,
//     configurable: true
//   },
//   age: {
//     value: 23,
//     writable: true,
//     enumerable: true,
//     configurable: true
//   }
// }
