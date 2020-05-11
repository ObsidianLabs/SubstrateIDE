const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CopyPlugin = require('copy-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

const baseConfig = require('./webpack.base.config')

console.log(process.env.BUILD)

module.exports = merge.smart(baseConfig, {
  target: 'electron-main',
  entry: {
    index: './src.main/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dev')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            [
              '@babel/preset-env',
              { targets: 'maintained node versions' }
            ],
            '@babel/preset-typescript'
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }]
          ]
        }
      },
      {
        test: /pty\.node$/,
        loader: 'native-ext-loader',
        options: {
          basePath: process.env.NODE_ENV === 'production'
            ? ['..', '..', 'node_modules', 'node-pty', 'build', 'Release']
            : ['..', 'node_modules', 'node-pty', 'build', 'Release'],
          emit: false
        }
      },
      {
        test: /\.node$/,
        use: 'native-ext-loader'
      }
    ]
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'extensions/polkadot-js/packages/extension/build',
        to: 'extensions/polkadot-js'
      }
    ]),
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src.main/**/*']
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    })
  ]
})
