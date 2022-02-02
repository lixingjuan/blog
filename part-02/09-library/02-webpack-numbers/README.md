## 将lodash externals

> externals 前后包体积  70.1 KiB => 1.16 KiB


```js
module.exports = {
  mode: "production",


  // ...
  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    }
  }
};

```