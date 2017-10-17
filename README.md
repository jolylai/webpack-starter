## [本项目是基于jspang的webpack教程](http://jspang.com/2017/09/16/webpack3-2/)

个人博客[笔记](https://jolylai.github.io/2017/10/16/webpack/)
### webpack.config.js
```
module.exports={
  //入口文件的配置项
  entry:{},
  //出口文件的配置项
  output:{},
  //模块：例如解读CSS,图片如何转换，压缩
  module:{},
  //插件，用于生产模版和各项功能
  plugins:[],
  //配置webpack开发服务功能
  devServer:{}
}
```

### module
Loader
- test：用于匹配处理文件的扩展名的表达式，这个选项是必须进行配置的；
- use：loader名称，就是你要使用模块的名称，这个选项也必须进行配置，否则报错；
- include/exclude:手动添加必须处理的文件（文件夹）或屏蔽不需要处理的文件（文件夹）（可选）；
- query：为loaders提供额外的设置选项（可选）。

Loader 的三种写法
```
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
  ]
}

module: {
  rules: [
    {
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }
  ]
}

module: {
  rules: [
    {
      test: /\.css$/,
      use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
    }
  ]
}
```

#### CSS文件打包(less sass)
yarn add css-loader --dev
yarn add style-loader --dev
```
module: {
  rules: [
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }, {
      test: /\.less$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      , {
        loader: "less-loader" // compiles Less to CSS
      }]
    }, {
      test: /\.scss$/,
      use: [{
          loader: "style-loader" // creates style nodes from JS strings
      }, {
          loader: "css-loader" // translates CSS into CommonJS
      }, {
          loader: "sass-loader" // compiles Sass to CSS
      }]
    }
  ]
}
```

#### 图片写入CSS
yarn add url-loader --dev
yarn add file-loader --dev
```
modul: [
  {
    test: /\.(png|jpg|gif)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 50000,
        outputPath: 'images/'
      }
    }
  }
]
```
- test:/\.(png|jpg|gif)/是匹配图片文件后缀名称。
- use：是指定使用的loader和loader的配置参数。
- limit：是把小于500000B的文件打成Base64的格式，写入JS。
- outputPath: 将打包后的图片放到images目录下

* file-loader：解决引用路径的问题，拿background样式用url引入背景图来说，我们都知道，webpack最终会将各个模块打包成一个文件，因此我们样式中的url路径是相对入口html页面的，而不是相对于原始css文件所在的路径的。这就会导致图片引入失败。这个问题是用file-loader解决的，file-loader可以解析项目中的url引入（不仅限于css），根据我们的配置，将图片拷贝到相应的路径，再根据我们的配置，修改打包后文件引用路径，使之指向正确的文件。

* url-loader：如果图片较多，会发很多http请求，会降低页面性能。这个问题可以通过url-loader解决。url-loader会将引入的图片编码，生成dataURl。相当于把图片数据翻译成一串字符。再把这串字符打包到文件中，最终只需要引入这个文件就能访问图片了。当然，如果图片较大，编码会消耗性能。因此url-loader提供了一个limit参数，小于limit字节的文件会被转为DataURl，大于limit的还会使用file-loader进行copy。

1.文件大小小于limit参数，url-loader将会把文件转为DataURL（Base64格式）；

2.文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader。

#### CSS分离
yarn add extract-text-webpack-plugin --dev
```
const extractTextPlugin = require("extract-text-webpack-plugin");

module: {
  rules: [
    {
      test: /\.css$/,
      use: extractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.less$/,
      use: extractTextPlugin.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "less-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }, {
      test: /\.scss$/,
      use: extractTextPlugin.extract({
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
      })
    }
  ]
},
plugins: [
  // 参数为打包后的路径
  new extractTextPlugin('/css/index.css')
]
```

#### HTML中的图片
yarn add html-withimg-loader --dev
```
module: {
  rules: [
    {
      test: /\.(htm|html)$/i,
      use:['html-withimg-loader'] 
    }
  ]
}
```
处理HTML中'<img src='./images/farm.png' />'

### plugins

#### 压缩js代码
```
const uglify = require('uglifyjs-webpack-plugin')

plugins: [
  new uglyfy()
]
```

#### 打包HTML文件
yarn add html-webpack-plugin
```
const HtmlWebpackPlugin = require('html-webpack-plugin')

plugins: [
  new HtmlWebpackPlugin({
    hash: true,
    minify: {
      removeAttributeQuotes: true
    },
    template: './src/index.html'
  })
]
```

- minify：是对html文件进行压缩，removeAttrubuteQuotes是却掉属性的双引号。
- hash：为了开发中js有缓存效果，所以加入hash，这样可以有效避免缓存JS。
- template：是要打包的html模版路径和文件名称。

### devServer（热更新）
yarn add webpack-dev-server --dev
```
  devServer:{
      //设置基本目录结构
      contentBase:path.resolve(__dirname,'dist'),
      //服务器的IP地址，可以使用IP也可以使用localhost
      host:'localhost',
      //服务端压缩是否开启
      compress:true,
      //配置服务端口号
      port:1717
  }
```

未整理
#### 图片路径问题
```js
output: {
	filename: "bundle.js",
	path: '/dist',
	publicPath: 'http://127.0.0.1:8080/'
}
```
配置完成后，你再使用webpack命令进行打包，你会发现原来的相对路径改为了绝对路径，这样来讲速度更快。

#### 打包后调试
```js
module.exports = {
	devtool: 'eval-source-map'
}
```

在配置devtool时，webpack给我们提供了四种选项

- source-map:在一个单独文件中产生一个完整且功能完全的文件。这个文件具有最好的source map,但是它会减慢打包速度；
- cheap-module-source-map:在一个单独的文件中产生一个不带列映射的map，不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列（符号）,会对调试造成不便。
- eval-source-map:使用eval打包源文件模块，在同一个文件中生产干净的完整版的sourcemap，但是对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定要不开启这个选项。
- cheap-module-eval-source-map:这是在打包文件时最快的生产source map的方法，生产的 Source map 会和打包后的JavaScript文件同行显示，没有影射列，和eval-source-map选项具有相似的缺点。

四种打包模式，有上到下打包速度越来越快，不过同时也具有越来越多的负面作用，较快的打包速度的后果就是对执行和调试有一定的影响。

个人意见是，如果大型项目可以使用source-map，如果是中小型项目使用eval-source-map就完全可以应对，需要强调说明的是，source map只适用于开发阶段，上线前记得修改这些调试设置。

#### 开发和生产并行
package.json
```js
 "scripts": {
    "server": "webpack-dev-server --open",
    "dev":"set type=dev&webapck",
    "build": "set type=build&webpack"
  },
```

Mac下的package.json
```js
	"scripts": {
	"server": "webpack-dev-server --open",
	"dev":"export type=dev&&webpack",
	"build": "export type=build&&webpack"
	},
```

ps
	- '&'左右不能有空格
	- MAC电脑下需要把set换成export，并且要多加一个&符

webpack.config.js
```js
if (process.env.type === 'build') {
	var websit = {
		publicPath: 'http://192.168.0.104:1717'
	}
} else {
	var websit = {
		publicPath: 'http://cdn.jspang.com/'
	}
}
```

查看type
```js
console.log( 'type', encodeURIComponent(process.env.type) );
```

#### 打包第三方库
```js
const webpack = require('webpack')

plugins: [
	new webpack.providePlgin({
		$: 'jquery'
	})
]
```

- 全局引入，不需要在每个文件import $ from 'jquery'