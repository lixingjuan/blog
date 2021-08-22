// const bills = [
//   {type: 'shop', value: 233},
//   {type: 'shop', value: 678},
//   {type: 'shop', value: 145},
//   {type: 'transfer', value: 123},
// ]

// bills.reduce()


// const bills = [
//   { type: 'shop', momey: 223 },
//   { type: 'shop', momey: 821 },
//   { type: 'study', momey: 341 },
//   { type: 'transfer', momey: 821 },
//   { type: 'study', momey: 821 }
// ];


// const res = bills.reduce((tol, cur)=>{
//   tol[cur.type] = tol[cur.type] || []
//   tol[cur.type].push(cur)
//   return tol
// },{})

// console.log(res)

const arr = [1,2,3,1,2,3]

const res = arr.reduce((tol,cur)=>{
  if(!tol.includes(cur)){
    tol.push(cur)
  }
  return tol
},[])

console.log(res)