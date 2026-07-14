## 自动批处理

## 新的根 API

1. 一些 API 的废弃, ReactDom.render, 改为 createRoot(dom).render

## 并发特性

React 18 引入了一些新的并发特性，这些特性允许 React 在保持页面响应的同时进行复杂的更新。主要包括：

- startTransition：此 API 可以用来标记更新的优先级较低的状态变化，使得用户的交互（如点击、输入等）不会因为这些更新而变得迟缓。这有助于改善应用的交互性能，保持应用的流畅性。
- useDeferredValue：用于延迟某个值的更新，适合用于如文本输入等场景，可以避免输入过程中的卡顿。

## Server Components

## 新的挂起模型

React 18 改进了挂起（Suspense）模型，不仅可以用于数据获取，还可以更好地整合代码分割等场景。

<!-- 3. automatic batchUpdate： 自动批处理
1. ConcurrentMode
2. useTransition/startTransition
3. componet reUseable, 保持状态，卸载组件
4. useEvent
5. useId
6. useInsertionEffect
7.  useSyncExternalStore

# 渲染模式（https://zhuanlan.zhihu.com/p/60307571）

1. Sync
2. Debounced
3. ConcurrentMode -->
