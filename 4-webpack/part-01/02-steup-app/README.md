1. pwd, 当前工作区的绝对路径
2. 在工作区执行webpack, 使用的是全局的webpack
3. npx, 依托于npm, 执行 `npx webpack`, 其会自动去上层文件夹查找是否有`webpack`, 若有，则执行
4. 命令
   1. `npx webpack --entry ./src/index.js --mode production`, 可以主动指定entry和mode