## Promise 微任务重的错误能被捕获么？

- 被catch捕获
```js
Promise.resolve().then(() => {
  throw new Error('hello')
}, () => {
  console.log('2')
}).catch(() => {
  console.log('1') // 会打印这个
})
```


## 方法们

|                    | 描述                                |
|--------------------|-------------------------------------|
| Promise.all        | 全成功then, 一个失败就catch         |
| Promise.race       | 第一个成功到then, 第一个失败就catch |
| Promise.allSettled | 全都有结果到then                    |