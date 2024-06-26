const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  mode: "development",

  entry: {
    app1: "./src/app1.js",
    app2: "./src/app2.js"
  },

  output: {
    path: path.resolve(__dirname, "./dist"),
    clean: true,
   },

  plugins: [
    new HtmlWebpackPlugin(),
    new BundleAnalyzerPlugin(),
    new Visualizer()
  ],
};
