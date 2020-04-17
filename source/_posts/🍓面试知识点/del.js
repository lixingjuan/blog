/*  */
function add(a, b, c) {
  console.log(a + b + c);
}
function curry(fn, ...args) {
  const length = fn.length;

  return function(..._args) {
    const finalArr = [...args, ..._args];
    if (finalArr.length < length) {
      return curry.call(this, fn, ...finalArr);
    } else {
      return fn.apply(this, finalArr);
    }
  };
}

console.log(curry(add, 1)(2)(3));
console.log(curry(add)(1)(2)(3));
