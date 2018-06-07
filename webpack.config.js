const ExtractTextPlugin = require("extract-text-webpack-plugin"); //use this npm i -D extract-text-webpack-plugin@next
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require("webpack");
const nodeExternals = require('webpack-node-externals')

const browserConfig = {

  entry: [
    './src/index.js'
  ],

  plugins: [
    new UglifyJsPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.DefinePlugin({
      __isBrowser__: "true"
    })
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sess to CSS
        }]
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js', '.jsx']
  },

  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './public',
    inline: true,
    publicPath: '/',
    historyApiFallback: {
      index: 'index.html'
    }
  }
};

const serverConfig = {
  entry: './src/server/index.js',
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: __dirname,
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "sass-loader" // compiles Sess to CSS
        }]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __isBrowser__: "false"
    })
  ]
};

module.exports = [browserConfig, serverConfig]