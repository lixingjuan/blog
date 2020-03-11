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

const a = [
  { name: "1", checked: false },
  { name: "2", checked: true }
];
console.log(a.filter(item => item.checked === false));
console.log(
  a.forEach(item => {
    item.name === "1" ? (item.checked = !item.checked) : "";
    return item;
  })
);
console.log(a);
