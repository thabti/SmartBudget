process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const dirname = path.resolve(__dirname, '../../../');
const webpackResources = require('./webpack.resources')(dirname);


module.exports = {
  context: dirname,
  entry: [
    path.join(dirname, './Application/index.js'),
  ],
  output: {
    path: path.join(__dirname, '/public/'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      'react-native': './tools/ReactNativeWeb'
    },
    extensions: [".js", ".json", ".scss"]
  },
  module: {
    loaders: webpackResources.module.loaders.concat([
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          babelrc: false,
          presets: [["es2015", { "modules": false }], 'react', 'stage-0'],
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  imports: ['react']
                }
              ],
            }], 'transform-runtime', 'transform-es2015-modules-umd'
          ],
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
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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