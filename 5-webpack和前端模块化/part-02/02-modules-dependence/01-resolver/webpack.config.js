const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",

  entry: "./src/app.js",

  output: {
    clean: true,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },

    extensions: [".json"]
  },

  plugins: [new HtmlWebpackPlugin()],
};
