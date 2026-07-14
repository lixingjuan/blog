const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { ModuleFederationPlugin } = require("webpack").container

module.exports = {
  mode: "development",

  entry: "./src/index.js",

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
   },

  plugins: [
    new HtmlWebpackPlugin(),

    new ModuleFederationPlugin({
      name: 'home',
      filename: 'remoteEntry.js',
      remotes: {
        nav: "nav@http://localhost:3002/remoteEntry.js"
      },
      exposes: {
        "./HomeList": "./src/HomeList.js"
      },
      // 三方共享模块
      shared: {}
    })
  ],
};
