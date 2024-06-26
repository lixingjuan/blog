const path = require("path");
// 构造函数或者类，大写命名
const HtmlWebpackPlugin = require("html-webpack-plugin");

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

    // 每次打包清除上次没用的
    clean: true,
  },

  mode: "development",

  devtool: "inline-source-map",

  plugins: [
    new HtmlWebpackPlugin({
      // 打包文件的入口文件所使用的模版html
      template: "index.html",
      // 打包文件的入口文件名
      filename: "app.html",
      // script标签放在html文件的body
      inject: "body",
    }),
  ],

  // 热更新
  devServer: {
    static: "./dist",
  },
};
