process.env.NODE_ENV = 'dev';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dirname = path.resolve(__dirname, '../../../');
const webpackResources = require('./webpack.resources')(dirname);

module.exports = {
  context: dirname,
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.join(dirname, 'index.web')
  ],
  output: {
    path: path.join(dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  module: {
    rules: webpackResources.module.rules.concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports   : ['react'],
                locals: ['module']
              }
            ],
          }], 'transform-runtime', 'transform-es2015-modules-umd'],
        },
      }
    ])
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'commons.js',
      minChunks: 2,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};