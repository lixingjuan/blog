## reduce 实现map

```js

// reduce 实现map

Array.prototype.reduceMap = function(callback){
  return this.reduce((tol,cur,index)=>{
    const newRecord = callback(cur, index)
    tol.push(newRecord)
    return tol
  },[])
}

const res = [1,2,3].reduceMap((item,index)=>{
  return item + index
})

console.log(res)
```


## reduce 实现 forEach

forEach接收一个函数，该函数有三个参数， 当前值，当前索引，当前正在被处理的数组

```js
Array.prototype.reduceForEach = function(callback){
  return this.reduce((tol,cur,index)=> {
    // const newRecord =
    callback(cur, index, this)
    // tol.push(newRecord)
    // return tol
  },[])
}
```


## reduce 实现 filter

filter接收一个回调函数，该回调函数接收三个参数，element, index, Array

```js
Array.prototype.reduceFilter = function(callback){
  return this.reduce((tol,cur,index)=> {
    if(callback(cur, index, this)){
      return cur
    }
  },[])
};


console.log([1,2,3].reduceFilter((item,index, arr)=> item > 2))
```



## redece 判断元素出现次数

```js
const arrDemo = [1,2,2,3,3,3,4,4,4,4]

const res = arrDemo.reduce((tol,cur)=>{
  Object.assign(tol,
    {[cur]: (tol[cur]|| 0) + 1 }
  )
  return tol
},{})

// { '1': 1, '2': 2, '3': 3, '4': 4 }

```



## 按照属性给数组分类

```js
const bills = [
  { type: 'shop', momey: 223 },
  { type: 'shop', momey: 821 },
  { type: 'study', momey: 341 },
  { type: 'transfer', momey: 821 },
  { type: 'study', momey: 821 }
];


const res = bills.reduce((tol, cur)=>{
  tol[cur.type] = tol[cur.type] || []
  tol[cur.type].push(cur)
  return tol
},{})

console.log(res)

// {
//  shop: [ { type: 'shop', momey: 223 }, { type: 'shop', momey: 821 } ],
//  study: [ { type: 'study', momey: 341 }, { type: 'study', momey: 821 } ],
//  transfer: [ { type: 'transfer', momey: 821 } ]
// }
```


## 数组去重

```js
const arr = [1,2,3,1,2,3]

const res = arr.reduce((tol,cur)=>{
  if(!tol.includes(cur)){
    tol.push(cur)
  }
  return tol
},[])

console.log(res)
```

