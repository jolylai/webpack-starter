const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  mode: "development",
  entry: "/src/main.js",
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node-modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.vue$/,
        use: ["vue-loader"],
      },
      // {
      //   test: /\.m?js$/,
      //   exclude: /node-modules/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["@babel/preset-env"],
      //     },
      //   },
      // },
    ],
  },
  optimization: {
    realContentHash: false,
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        defaultVendors: {
          name: "chunk-vendors",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: "initial",
        },
        common: {
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: "initial",
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: "true",
      __VUE_PROD_DEVTOOLS__: "false",
    }),
  ],
};
