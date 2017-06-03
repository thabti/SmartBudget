process.env.NODE_ENV = 'dev';
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const dirname = path.resolve(__dirname, '../../../');
const env = require('./webpack.env');
const webpackResources = require('./webpack.resources')(dirname);

const WEBPACK_DEV_PORT = 4000;

module.exports = {
  devServer: {
    contentBase: path.join(dirname, '/public/'),
    compress: true,
    hot: true, // this enables hot reload
    inline: true, // use inline method for hmr
    clientLogLevel: 'error',
    port: WEBPACK_DEV_PORT
  },
  watch: true,
  context: dirname,
  devtool: 'inline-source-map',
  entry: [
    // activate HMR for React
    'react-hot-loader/patch',

    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint
    ['webpack-dev-server/client?http://localhost:', WEBPACK_DEV_PORT].join(''),

    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
    'webpack/hot/only-dev-server',
    // 'webpack-hot-middleware/client',
    path.join(dirname, 'index.web')
  ],
  output: {
    path: path.join(dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: ['http://localhost:', WEBPACK_DEV_PORT, '/'].join(''),
  },
  resolve: {
    alias: {
      'react-native': path.join(dirname, './tools/ReactNativeWeb')
    },
    extensions: [".js", ".json", ".scss"]
  },
  module: {
    rules: webpackResources.module.rules.concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [["es2015", { "modules": false }], 'react', 'stage-0'],
          plugins: [
            'react-hot-loader/babel',
            ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react']
              }
            ],
          }], 'transform-runtime', 'transform-es2015-modules-umd'],
        }
      }
    ])
  },
  plugins: webpackResources.plugins.concat([
    // enable HMR globally
    new webpack.HotModuleReplacementPlugin(),
    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
    })
  ]),
};