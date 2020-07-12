1. [npm 和 npx 有什么区别？](https://www.zhihu.com/question/327989736)
2. [npx使用教程-阮一峰](http://www.ruanyifeng.com/blog/2019/02/npx.html)

## 小结
1. 调用项目安装的模块，

```bash
node node-modules/.bin/mocha.js

# 相当于
npx mocha
```

2. 可以一次性使用某模块，举例：

```bash
npx node@12.0.0 -v
# 该命令会使用12.0.0 版本的node, 他会先将指定的模块下载到本地，使用后(查询了版本)，然后再删掉；
```

3. 可以传递参数
   1. --no-install 强制使用本地模块不下载，若本地没有就报错；  
   2. --ignore-existing 忽视本地模块强制下载，
   3. -p 执行版本 `npx -p node@12.0.0 -v`
   4. -c 
      1. 有多个命令时可以指定所有的命令都使用 npx解释，不然默认是第一个使用npx解释，其他用的shell;
      2. 也可以将npm 的环境变量带进npx
4. 也可以执行github上的模块源码；