
## npm切换淘宝源

npx - 是从npm v5.2.0时引入的一条命令，方便开发者执行本地已安装的可执行工具，不必配置scripts或者全局安装;
npx 是node自带的工具，他都能干嘛呢？

```bash
# 使用nrm工具切换淘宝源
npx nrm use taobao

# 如果之后需要切换回官方源可使用
npx nrm use npm
```


## node-sass安装慢或失败

设置npm镜像

```bash
# 用法1
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

# 用法2
npm config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"

# yarn 的 config 会继承 npm 的 config，所以只用设置 npm 的映射就行，
# 当然，如果不放心也可以:

yarn config set sass_binary_site "https://npm.taobao.org/mirrors/node-sass/"
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

