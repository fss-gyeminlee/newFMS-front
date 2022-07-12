
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin }  = require('clean-webpack-plugin')
const os = require('os')
let selfIp
try {
  // selfIp = os.networkInterfaces()['WLAN'][1].address
  selfIp = getIpAddress()
} catch (e) {
  selfIp = 'localhost'
}

const PORT = 8888
function getIpAddress () {
  const interfaces = require('os').networkInterfaces
  for (let devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i += 1) {
      let alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackConfigDev = {
  mode: 'development',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      IS_DEVELOPMETN: true,
    }),
    new HtmlWebpackPlugin({
      template: resolve('../app/index.html'),
      dlls: [],
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: resolve('../app'),
    historyApiFallback: false,
    open: true,
    hot: true,
    host: selfIp,
    port: PORT,
  },
}

module.exports = merge(webpackConfigBase, webpackConfigDev)
