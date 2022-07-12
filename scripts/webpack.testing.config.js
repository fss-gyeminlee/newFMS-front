
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  mode: 'development',
  output: {
    publicPath: './',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('testing'),
      IS_DEVELOPMETN: false,
    }),
    new HtmlWebpackPlugin({
      // inject: true, // will inject the main bundle to index.html
      template: resolve('../app/index.html'),
      // mapConfig:'http://192.168.0.1/map_config.js', 注释不用dll
      dlls: [
        // './resource/dll/vendor.dll.js',
        // './resource/dll/redux.dll.js',
      ],
    }),

    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new Copy([
      // { from: './app/resource/dll', to: '../dist/resource/dll' },
    ]),
    new CleanWebpackPlugin(),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
