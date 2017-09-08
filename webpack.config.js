const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const isProduction = false;

module.exports = function() {
  return {
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    entry: ['./client/index.js'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader'
            }
          ]
        }
      ]
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './index.html'
      })
    ],
    devServer: isProduction
      ? {}
      : {
          contentBase: path.resolve(__dirname, 'dist')
        }
  };
};
