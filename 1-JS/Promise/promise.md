## Promise 微任务中的错误能被捕获么？

- 被 catch 捕获

```js
Promise.resolve()
  .then(
    () => {
      throw new Error("hello");
    },
    () => {
      console.log("2");
    }
  )
  .catch(() => {
    console.log("1"); // 会打印这个
  });
```

## 方法们

| Api                | 描述                                                                           |
|--------------------|--------------------------------------------------------------------------------|
| Promise.all        | 全成功 then,返回数组； 一个失败就 catch，第一个失败作为理由                    |
| Promise.race       | 第一个成功到 then, 第一个失败就 catch                                          |
| Promise.any        | promises中任意一个变成fulfilled, 就会走到then; 若全部变成rejected, 则走到catch |
| Promise.allSettled | 全都有结果到 then, 返回值为数组，item包含每个promise的status, value, reason    |
