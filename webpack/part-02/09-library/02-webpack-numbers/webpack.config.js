const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "production",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
    filename: "webpack-numbers.js",
    library: {
      name: "webpackNumbers",
      type: 'umd'
    },
    globalObject: "globalThis"
  },

  externals: {
    lodash: {
      commonjs: "lodash",
      commonjs2: "lodash",
      amd: "lodash",
      root: "_",
    }
  }
};
