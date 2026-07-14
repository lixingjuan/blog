const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./app.js",

  output: {
    clean: true,
  },

  devtool: "eval-source-map",

  plugins: [new HtmlWebpackPlugin()],
};
