
## 打包出支持 script标签引入

webpack.config.js 配置

```js
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "myLib.js",
    library: 'myLib'
   },
};

```

或者

```js
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "myLib.js",
    /* !! 配置了该属性，就不会被treeShaking */
    library: {
      name: 'myLib',
      type: "window"
    }
   },
};

```


## 打包出支持 ESModule

```js
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  experiments: {
    /* !! ESModule 需要允许实验性功能 */
    outputModule: true
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "myLib.js",
    /* !! 配置了该属性，就不会被treeShaking */
    library: {
      type: "module"
    }
   },
};

```


## 打包出支持 common.js

webpack.config.js

```js
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "myLib.js",
    /* !! 配置了该属性，就不会被treeShaking */
    library: {
      name: 'myLib',
      type: "commonjs"
    }
   },
};

```



## 打包出UMD => 同时 支持 common.js & script

```js
const path = require("path");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  // experiments: {
  //   outputModule: true
  // },

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "myLib.js",
    /* !! 配置了该属性，就不会被treeShaking */
    library: {
      name: 'myLib',
      type: "umd"
    },
    /* !! globalThis 代替 全局self */
    globalObject: "globalThis"
   },
};

```