/** Promise.race */
const MyPromiseRace = (arr) => {
  const promises = arr.map(it => Promise.resolve(it));
  return new Promose((resolve, reject) => {
    promises.forEach(fn => {
      fn.then(resolve,reject)
    })
  })
}