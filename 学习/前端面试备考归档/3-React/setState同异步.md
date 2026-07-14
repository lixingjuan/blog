## 是同步更新么？



## 是批量更新么？

1. 在外部是批量更新
**click, 触发渲染1次**

```jsx
const onClick = () => {
  setcount((pre) => pre + 1);
  setcount((pre) => pre + 1);
  setcount((pre) => pre + 1);
};

```


2. 在setTimeout, Promise等中, 不是批量更新
**触发渲染3次**

```jsx
  const onClick = () => {
    setcount((pre) => pre + 1);
    setTimeout(() => {
     setcount((pre) => pre + 1);
     setcount((pre) => pre + 1);
    }, 0);
  };

```

3. 强制批量更新批量更新，ReactDOM.unstable_batchedUpdates
**触发渲染2次**

```jsx
  const onClick = () => {
    setcount((pre) => pre + 1);
    setTimeout(() => {
      unstable_batchedUpdates(() => {
        setcount((pre) => pre + 1);
        setcount((pre) => pre + 1);
      });
    }, 0);
  };

```