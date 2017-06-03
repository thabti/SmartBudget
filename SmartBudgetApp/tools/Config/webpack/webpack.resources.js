/* eslint-disable */
const path = require('path'),
  webpack = require('webpack'),
  env = require('./webpack.env'),
  autoprefixer = require('autoprefixer');

module.exports = function (dirname) {
  const styleLoader = { loader: 'style-loader', options: { sourceMap: false } },
    cssLoader = {
      loader: 'css-loader', options: {
        // minimize: true,
        camelCase: true,
        modules: true,
        importLoaders: 1,
        sourceMap: false,
        localIdentName: '[name]--[local]'
      }
    },
    resolveUrlLoader = { loader: 'resolve-url-loader', options: {} },
    sassOptions = {
      sourceMap: false,
      includePaths: [
        path.resolve(dirname, 'src'),
        path.resolve(dirname, 'node_modules'),
        path.resolve(dirname, 'node_modules', 'font-awesome', 'fonts')
      ],
      data: '$fa-font-path: "font-awesome/fonts";'
    },
    sassLoader = { loader: 'sass-loader', options: sassOptions },
    postcssLoader = { loader: 'postcss-loader', options: { sourceMap: false } },
    reactNativeWebSassPreprocessor = { loader: path.resolve(dirname, './tools/Config/CssProcessors/ReactNativeWebSplicerPreprocessor.js') },
    urlLoader = { loader: 'url-loader', options: { limit: 10000 } },
    svgLoader = { loader: 'url-loader', options: { limit: 10000, mimetype: 'image/svg+xml' } },
    woffLoader = { loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
    woff2Loader = { loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
    ttfLoader = { loader: 'url-loader', options: { limit: 10000, mimetype: 'application/octet-stream' } },
    eotLoader = { loader: 'url-loader', options: { limit: 10000 } },
    fileLoader = { loader: 'file-loader', options: {} },
    imgLoader = { loader: 'img-loader', options: {} };
  return {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: env.isDev,
        options: {
          postcss: [autoprefixer({ browsers: ['last 2 versions'] })],
        },
      })
    ],
    module: {
      rules: [
        // take all less || sass files, compile them, and bundle them in with our js bundle
        // { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
        {
          test: /\.(s?)css$/,
          exclude: /node_modules/,
          use: [
            // { loader: 'react-native-css-loader', options: { babelrc: false } },
            styleLoader,
            cssLoader,
            sassLoader,
            postcssLoader,
            reactNativeWebSassPreprocessor
          ]
        },
        {
          test: /\.(s?)css$/,
          include: /node_modules/,
          use: [
            // { loader: 'react-native-css-loader', options: { babelrc: false } },
            styleLoader,
            cssLoader,
            sassLoader,
            reactNativeWebSassPreprocessor
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            urlLoader,
            imgLoader
          ]
        },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, use: [svgLoader] },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, use: [woffLoader] },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, use: [woff2Loader] },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, use: [ttfLoader] },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, use: [eotLoader] }
      ]
    }
  };
};
/* eslint-enable */
