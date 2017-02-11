process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const dirname = path.resolve(__dirname, '../../../');
const webpackResources = require('./webpack.resources')(dirname);


module.exports = {
  context: dirname,
  entry: [
    path.join(dirname, 'index.web'),
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web'
    }
  },
  module: {
    loaders: webpackResources.module.loaders.concat([
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
    new webpack.DefinePlugin({
      'process.env': {
        // Useful to reduce the size of client-side libraries, e.g. react
        NODE_ENV: JSON.stringify('production'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
    }),
    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        booleans: true,
        conditionals: true,
        drop_console: true,
        drop_debugger: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true
      }
    }),
  ],
};