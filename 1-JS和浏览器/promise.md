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