
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}

// TODO client -> app.js 로 변경
const webpackConfigBase = {
  entry: {
    // client: resolve('../app/app.js'),
    client: resolve('../app/client.js'),
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ?'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'chunks/[name].[contenthash].js',
    // publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // modules: [
    //   resolve('app'),
    //   resolve('node_modules'),
    // ],
    alias: { // 컴파일 속도 향상을 위해 별칭 사용 줄이기
      '@app': path.join(__dirname, '../app'),
      '@actions': path.join(__dirname, '../app/redux/actions'),
      '@reducers': path.join(__dirname, '../app/redux/reducers'),
      '@apis': path.join(__dirname, '../app/apis'),
      '@components': path.join(__dirname, '../app/components'),
      '@configs': path.join(__dirname, '../app/configs'),
      '@config': path.join(__dirname, '../app/configs/config.js'),
      '@ajax': path.join(__dirname, '../app/configs/ajax.js'),
      '@reg': path.join(__dirname, '../app/configs/regular.config.js'),
      '@images': path.join(__dirname, '../app/images'),
      '@middleware': path.join(__dirname, '../app/middleware'),
      '@pages': path.join(__dirname, '../app/pages'),
      '@styles': path.join(__dirname, '../app/styles'),
      '@tableList': path.join(__dirname, '../app/components/tableList/tableList.js'),
      'react-dom': devMode ? '@hot-loader/react-dom' : 'react-dom', // react-hot-loader
    },
  },
  optimization: {
    usedExports: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 1,
      name: true,
      automaticNameDelimiter: '~',
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        vendor: {
          // 입력해야 하는 모듈 필터링
          // test: module => {
          //   if (module.resource) {
          //     const include = [/[\\/]node_modules[\\/]/].every(reg => {
          //       return reg.test(module.resource);
          //     });
          //     const exclude = [/[\\/]node_modules[\\/](react|redux|antd|react-dom|react-router)/].some(reg => {
          //       return reg.test(module.resource);
          //     });
          //     return include && !exclude;
          //   }
          //   return false;
          // },
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          // minChunks: 1,
          priority: -10,// 모듈 진입 우선순위 결정
          reuseExistingChunk: true,// 기존 모듈의 재사용 사용
          enforce: true,
        },
        //  antd: {
        //    test: /[\\/]node_modules[\\/]antd/,
        //    name: 'antd',
        //    priority: 15,
        //    reuseExistingChunk: true,
        //  },
        echarts: {
          test: /[\\/]node_modules[\\/]echarts/,
          name: 'echarts',
          priority: 16,
          reuseExistingChunk: true,
        },
        "draft-js": {
          test: /[\\/]node_modules[\\/]draft-js/,
          name: 'draft-js',
          priority: 18,
          reuseExistingChunk: true,
        }
      },
    },
  },
  module: {
    // noParse: /lodash/,
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../app')],
        // loader: 'babel',
        loader: 'happypack/loader?id=happyBabel',
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: devMode,
              reloadAll: devMode,
            },
          },
          'happypack/loader?id=happyStyle',
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        exclude: /node_modules/,
        include: [resolve('../app/images')],
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[name].[hash:4].[ext]',
          outputPath: '/img'
        }
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]'
        }
      },
    ],
  },
  performance: false,
  plugins: [
    // new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/),

    new MiniCssExtractPlugin({
      filename: devMode ? 'css/style.css':'css/style.[contenthash].css',
      chunkFilename: devMode ? 'css/style.[id].css':'css/style.[contenthash].[id].css'
    }),

    new HappyPack({
      id: 'happyBabel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          // babelrc: true,
          cacheDirectory: true //
        }
      }],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new HappyPack({
      id: 'happyStyle',
      loaders: [
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2, //
            // modules: true, //
            sourceMap: true,
          }
        },
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          }
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          }
        }
      ],
      threadPool: happyThreadPool,
      verbose: false,
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ]
}

module.exports = webpackConfigBase
