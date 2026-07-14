## 安装husky

1. `git init`
2. `npm install husky -D`
3. `npx husky install`
4. 在.husky文件夹下新建文件 `pre-commit`
5. 然后去执行commit, 发现报错

      ```js
      hint: The '.husky/pre-commit' hook was ignored because it's not set as executable.
      hint: You can disable this warning with `git config advice.ignoredHook false`.
      ```
6. 执行 `chmod +x .husky/pre-commit` 给予读写权限

