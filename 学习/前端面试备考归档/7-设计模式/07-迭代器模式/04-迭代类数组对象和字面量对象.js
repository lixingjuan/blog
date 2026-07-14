/** jQuery 中迭代行为的封装 */
const each = (obj, callback) => {
  let value,
    i = 0,
    lenght = obj.length,
    isArray = Array.isArray(obj);
  if (isArray) {
    for (; i < lenght; i++) {
      value = callback.call(obj[i], obj[i], i);

      if (value === false) {
        break;
      }
    }
  } else {
    for (i in obj) {
      value = callback.call(obj[i], i, obj[i]);

      if (value === false) {
        break;
      }
    }
  }
};

each(["apple", "pear", "strawberry"], console.log);
each(
  {
    name: "lixingjuan",
    age: 23,
  },
  console.log
);
