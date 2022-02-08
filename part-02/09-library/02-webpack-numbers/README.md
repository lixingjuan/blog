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

## 发布npm包

1. 确认当前npm源: 执行 `npm config get registry`  是否为  https://registry.npmjs.org/
2. 增加用户: `npm adduser`
3. 执行: `npm publish`