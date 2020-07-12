
## npm切换淘宝源

npx 是node自带的工具，他都能干嘛呢？

```bash
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```



## 切换node版本 

nvm - node.js version management，nodejs的版本管理工具

```bash
# 列出所有可以安装的node版本号
nvm ls-remote

# 安装指定版本号的node
nvm install v10.4.0

# 切换node的版本，这个是全局的
nvm use v10.3.0

# 当前node版本
nvm current

# 列出所有已经安装的node版本
nvm ls
```

## 执行脚本
npx - 是从npm v5.2.0时引入的一条命令，方便开发者执行本地已安装的可执行工具，不必配置scripts或者全局安装；

```bash

```