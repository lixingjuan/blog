# 使用场景

1. 需要读取或者更改 DOM 的场景

当需要读取 DOM 的属性 并且需要基于这些属性执行操作的时候，应该使用 `useLayoutEffect`。因为如果再 useEffect 中执行这些操作，可能会导致布局抖动或者视觉闪烁。因为浏览器可能已经绘制了 DOM。

示例

```jsx
useLayoutEffect(() => {
  const rect = domRef.current.getBoundingClientRect();
  if (rect.width > 500) {
    setWidth(500);
  }
}, []);
```

2. 需要同步调整 DOM 以避免视觉抖动

如果你的组件需要加载的时候立即进行 DOM 调整来避免视觉抖动或跳动，应使用 `useLayoutEffect`。因为它保证了你的 DOM 更改在任何画面绘制之前完成。

示例

```jsx
useLayoutEffect(() => {
  domRef.current.style.transition = "none";
  domRef.current.style.opacity = 0;
  setTimeout(() => {
    domRef.current.style.transition = "opacity 500ms";
    domRef.current.style.opacity = 1;
  });
});
```

这里使用 `useLayoutEffect` 来初始化组件的透明度，避免用户看到完全透明到完全不透明的过度效果

3. 与第三方 DOM 库集成

当需要集成直接 DOM 操作的第三方库时，`useLayoutEffect` 更合适，特别是这些操作需要再屏幕更新前完成的时候

示例

```jsx
useLayoutEffect(() => {
  // 初始化第三方库，可能需要直接操作DOM
  library.create(domRef.current);
  return () => {
    library.destory();
  };
}, []);
```
