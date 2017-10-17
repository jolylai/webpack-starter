const path = require('path')
const ClenaWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const uglify = require('uglifyjs-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

console.log('type', encodeURIComponent(process.env.type));

module.exports = {
  devtool: 'evel-source-map',
  entry: './src/entry.js',
  output: {
    // 获取项目绝对路径
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            // limit: 500,
            // outputPath: 'images/'
          }
        }]
      }, {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      }, {
        test: /.less$/,
        use: extractTextPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          // use style-loader in development
          fallback: "style-loader"
        })
      }
    ]
  },
  plugins: [
    new ClenaWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      hash: true,
      minify: {
        removeAttributeQuotes: true
      },
      template: './src/index.html'
    }),
    // new uglify(),
    new extractTextPlugin("/css/index.css"),
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    compress: true,
    port: 8080
  }
}