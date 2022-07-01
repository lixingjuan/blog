## 常见代码分离方式

1. 入口起点
   1. 使用entry配置手动地分离代码
   2. 缺点：多个文件共享的文件会分别在每个包里重复打包
2. 防止重复
   1. 使用entry dependencies 或者 SplitChunkdPlugin 去重和分离代码
3. 动态导入
   1. 通过模块的内联函数 `import` 来调用函数分离代码


## 动态导入的应用

实现懒加载

1. 初次不加载
2. 点击时间才加载
3. 魔法注释
   1.  `webpackChunkName: 'math'`: 修改打包后文件名称
   2.  `webpackPrefetch: true`: 预获取, 网络空闲的时候提前加载
   3.  `webpackPreload: true`: 预加载, 和懒加载效果比较像

```js
const button = document.createElement("button");
button.innerHTML = "点击执行加法运算";
button.addEventListener("click", () => {
  import(/* webpackChunkName: 'math', webpackPrefetch: true */ "./math.js").then(({ add }) => {
    console.log(add(1, 3));
  });
});
document.body.appendChild(button);
```