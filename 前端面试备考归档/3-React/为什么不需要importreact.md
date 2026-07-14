## 为什么不需要 importreact

这主要得益于 react 引入了新的 jsx 编译方式，之前的 jsx 会被编译为 React.createElement, 但是从 react17 开始，变成了 jsx 或 jsxs 函数的调用，借助 babel plugin, 可以自动从 react/jsx-runtime 中引入 \_jsx 函数

Babel 用户应该使用支持这一特性的 Babel 插件 @babel/plugin-transform-react-jsx，并在 Babel 配置中启用
