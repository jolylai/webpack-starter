const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "/src/main.js",
  plugins: [new HtmlWebpackPlugin()],
};
