const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/app.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
  },

  devServer: {
    devMiddleware: {
      /* !! 每次热编译都写入硬盘, 默认是写入告诉缓存中的 */
      writeToDisk: true,
    }
  },

  plugins: [
    new HtmlWebpackPlugin(),
    new WorkboxWebpackPlugin.GenerateSW({
      // 帮助快速启用ServieWorker
      clientsClaim: true,
      // 跳出等待
      skipWaiting: true
    })
  ],
};
