const path = require("path");
const { DefinePlugin } = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const PreloadWebpackPlugin = require("@vue/preload-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    app: ["./src/main.js"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  output: {
    // path: "/Users/laiguolin/Workspace/demo/vue-cli/dist",
    // filename: "js/[name].js",
    // chunkFilename: "js/[name].js",
    // publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.css$/,
        exclude: /node-modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node-modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
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
    /* config.plugin('prefetch') */
    new PreloadWebpackPlugin({
      rel: "prefetch",
      include: "asyncChunks",
    }),
    /* config.plugin('preload') */
    new PreloadWebpackPlugin({
      rel: "preload",
      include: "initial",
      fileBlacklist: [/\.map$/, /hot-update\.js$/],
    }),
  ],
};
