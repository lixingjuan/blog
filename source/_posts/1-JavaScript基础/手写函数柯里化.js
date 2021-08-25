/* ****************************************************************************************************
 *                                    《高程》的实现
 ************************************************************************************************* */

function curry(fn) {
    // 获取第一次传入的参数，固化的部分
    const [, ...args] = arguments; // args,包含了来自外部函数

    return function () {
        const innerArgs = Array.prototype.slice.call(arguments); // innerArgs，用来存放内部函数的所有参数
        const finalArgs = [...args, ...innerArgs];
        return fn.apply(null, finalArgs); // 使用apply将结果传递给函数 fn
    };
}

function add(num1, num2) {
    return num1 + num2;
}

const curriedAdd = curry(add, 5);

console.log(curriedAdd(3));


const demo = function (aaa) {
    console.log(aaa)
    console.log(arguments)
}
console.log(demo(1, 2, 3))


function curry1(fn, ...args){
  const length = fn.length;

   return (...innerArgs)=> {
     const allArgs = [...innerArgs, ...args];
     if (allArgs.length < length) {
        return curry2.apply(this, [fn, ...allArgs]);
      } else {
        return fn.apply(this, allArgs);
      }
    }

}

function curry2(fn, ...args) {
    const length = fn.length;

    return function (..._args) {
        const finalArgs = [...args, ..._args];

        if (finalArgs.length < length) {
            return curry.call(this, fn, ...finalArgs);
        } else {
            return fn.apply(this, finalArgs);
        }
    };
}


function curry3(fn, ...args) {
    //
    if (fn.length > args.length) {
        return (...innerArgs) => curry.call(this, fn, ...args, ...innerArgs);
    } else {
        return fn.apply(this, args);
    }
}

const add2 = (a, b, c) => {
    return a + b + c;
}

console.log(curry1(add2, 1)(2)(3))
console.log(curry2(add2, 1)(2)(3))
console.log(curry3(add2, 1)(2)(3))