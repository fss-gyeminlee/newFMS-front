
const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const Copy = require('copy-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
  mode: 'production',
  output: {
    publicPath: './',
  },
  devtool: 'cheap-module-souce-map',
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        cache: path.resolve('.cache'),
        parallel: 4,
        // sourceMap,
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    new HtmlWebpackPlugin({
      // inject: true, // will inject the main bundle to index.html
      template: resolve('../app/index.html'),
      // mapConfig:'http://192.168.0.1/map_config.js',
      dlls: [
        // './resource/dll/vendor.dll.js',
        // './resource/dll/redux.dll.js',
      ],
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
    new Copy([
      // { from: './app/resource/dll', to: '../dist/resource/dll' },
    ]),
    new OptimizeCSSAssetsPlugin(),
    new CleanWebpackPlugin(),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
