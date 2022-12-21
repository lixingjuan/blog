const isObject = (val) => {
  return typeof val === "object" && val !== null;
};

const deepCompare = (objA, objB) => {
  if (!isObject(objA) && !isObject(objB)) {
    return objA === objB;
  }

  if (objA === objB) {
    return true;
  }

  if (Object.keys(objA).length !== Object.keys(objB).length) {
    return false;
  }

  for (let key in objA) {
    const res = deepCompare(objA[key], objB[key]);

    if (res === false) {
      return false;
    }
  }

  return true;
};

//定义两个对象进行比较
var obj1 = {
  x: 100,
  y: {
    a: 10,
    b: 10,
  },
  z: 200,
};
var obj2 = {
  x: 100,
  y: {
    a: 10,
    b: 10,
  },
  z: 200,
};

console.log(deepCompare(obj1, obj2));
