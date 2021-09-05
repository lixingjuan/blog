
## 多个任务限制并发量

> 请听题：如果我有很多图片要请求，我希望一次同时请求3个，只要其中一个任务完成，后面立马有个任务补位进去

测试用例如下


```js
/**
 * @desc 多个任务并发执行
 * @param {*} urls
 * @param {*} handler
 * @param {*} limit 并发量
 */
function limitLoad(urls, handler, limit) {}

const urls = [
  {
    info: "link1",
    time: 3000,
  },
  {
    info: "link2",
    time: 1000,
  },
  {
    info: "link3",
    time: 800,
  },
  {
    info: "link4",
    time: 4000,
  },
  {
    info: "link5",
    time: 2000,
  },
  {
    info: "link6",
    time: 3000,
  },
  {
    info: "link7",
    time: 2000,
  },
  {
    info: "link8",
    time: 1000,
  },
  {
    info: "link9",
    time: 3000,
  },
  {
    info: "link10",
    time: 2000,
  },
  {
    info: "link11",
    time: 1000,
  },
];

function loadImg(url) {
  return new Promise((resolve, reject) => {
    console.log("------" + url.info + "start!");
    setTimeout(() => {
      console.log(url.info + "ok!!!!");
      resolve();
    }, url.time);
  });
}

limitLoad(urls, loadImg, 3);

```

## 代码实现

完美的利用 `Promise.race的特点`
1. 接受一个数组，
2. 只要有一个状态改变，立即返回

```js
/**
 * @desc 多个任务并发执行
 * @param {*} urls
 * @param {*} handler
 * @param {*} limit 并发量
 */
function limitLoad(urls, handler, limit) {
  const sequence = [...urls];
  let promises = [];

  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index;
    });
  });
  // 前3个开始执行
  let p = Promise.race(promises);

  // 此时sequence长度已经截掉了3
  for (let i = 0; i < sequence.length; i++) {
    p = p.then((res) => {
      // 走到这里说明已经有一个任务已经完成，返回的res是 已经完成的任务的index (可能值为 0, 1, 2)
      // 假设 索引2的先完成，则此时即是为promises 索引2的位置赋值了一个新的任务
      promises[res] = handler(sequence[i]).then(() => {
        return res;
      });
      // 此时的promises仍然是存储了3个未完成的任务，return出去，再次赋值给p
      return Promise.race(promises);
    });
  }
}
```