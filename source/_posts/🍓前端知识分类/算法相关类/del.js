let arr = [
  3,
  44,
  38,
  5,
  47,
  15,
  88,
  23,
  21,
  12,
  333,
  218,
  36,
  26,
  27,
  2,
  46,
  4,
  19,
  50,
  48
];

const obj = {};

Object.defineProperty(obj, "age", {
  value: 22
});
obj.age = 55;
console.log(obj.age);
