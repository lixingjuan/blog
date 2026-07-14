## 遇到的问题

1. 包含jsx语法的js文件编译会报错：脚本修改 .jsx；
2. .js文件装饰器不识别: 脚本修改此类文件 .tsx文件；
3. antd组件和类型的引入地址lib: 增加同别名 /es；
4. 之前定义的一些环境变量，process.env等，需要在 `vite.config.js` 中定义
5. 循环引用问题：需要人力修改；
6. antd/icon内部报错：`global未定义`,在index.html将该变量挂载到window；
7. vscode的 go to type definition功能总是跳去lib包，需要找一下怎么配置；