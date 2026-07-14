const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    // 输入文件名
    filename: "bundle.js",
    /**
     * 输出路径, 必须是绝对路径
     * 1. __dirname, 当前文件 webpack.config.js, 所在的物理路径
     * 2. 基于__dirname, 找到 './dist'
     * */
    path: path.resolve(__dirname, "./dist"),
  },
  mode: "none",
};
