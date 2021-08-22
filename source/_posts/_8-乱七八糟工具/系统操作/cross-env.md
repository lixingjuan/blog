# cross-env, 跨平台设置环境变量

## 第一次见的时候 —— Hzero的脚手架

```
 "scripts": {
    "start": "cross-env node --max_old_space_size=8196 scripts/start.js",
    "build": "npm run lint:fix && cross-env node --max_old_space_size=5100 scripts/build.js",
    "build:analyze": "npm run lint:fix && cross-env ANALYZE=true node --max_old_space_size=8196 scripts/build.js",
    "build:dll": "webpack --progress --config config/webpack.dll.config.js",
  },
```

## 第二次见的时候
- umi设置端口号有多种方式

```
# OS X, Linux
$ PORT=3000 umi dev

# Windows (cmd.exe)
$ set PORT=3000&&umi dev

# Or use cross-env for all platforms
$ yarn add cross-env --dev
$ cross-env PORT=3000 umi dev

# .env
$ echo PORT=3000 > .env
```
- [umi环境变量设置链接](https://umijs.org/zh/guide/env-variables.html#%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE)


