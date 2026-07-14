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
      name: 'nav',
      filename: 'remoteEntry.js',
      remotes: {},
      exposes: {
        "./Header": "./src/Header.js"
      },
      // 三方共享模块
      shared: {}
    })
  ],
};
