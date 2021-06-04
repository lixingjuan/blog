// for (let i = 0;i < 10;i++) {
//   setTimeout(function () {
//     console.log(i)// 10个10
//   }, 1000)
// }




const source = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10];
const res = []
const demo = function (array) {
  for (let index = 0;index < array.length;index++) {
    const element = array[index];
    if (Array.isArray(element)) {
      demo(element)
    } else {
      if (!res.includes(element)) {
        res.push(element)
      }
    }
  }
}

// demo(source)
// res.sort((a, b) => a - b)

// console.log(res)

/* 方法一 */
const flat = (arr) => {
  if (!Array.isArray(arr)) {
    return arr
  }

  return arr.reduce((tol, cur) => tol.concat(flat(cur)), [])
}

console.log(Array.from(new Set(flat(source))))