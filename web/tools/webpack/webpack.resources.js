/* eslint-disable */
const path = require('path'),
  webpack = require('webpack'),
  env = require('./webpack.env'),
  autoprefixer = require('autoprefixer');

module.exports = function (dirname) {
  const sassLoader = ['sass-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
    postcssLoader = ['postcss-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
    resolveUrlLoader = ['resolve-url-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
    urlLoader = 'url-loader?limit=10000',
    fileLoader = 'file-loader',
    imgLoader = 'img-loader',
    sassOptions = {
      includePaths: [
        path.resolve(dirname, 'src'),
        path.resolve(dirname, 'node_modules'),
        path.resolve(dirname, 'node_modules', 'font-awesome', 'fonts')
      ],
      data: '$fa-font-path: "font-awesome/fonts";'
    };
  return {
    plugins: [
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [/*autoprefixer({ browsers: ['last 2 versions'] })*/],
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
          use:[
            { loader: 'react-native-css-loader' },
            { loader: sassLoader, options: sassOptions },
            { loader: postcssLoader }
          ]
        },
        {
          test: /\.(s?)css$/,
          include: /node_modules/,
          use:[
            { loader: 'react-native-css-loader' },
            { loader: sassLoader, options: sassOptions }
          ]
        },
        {
          test: /\.(jpe?g|png|gif)$/,
          use: [
            { loader: urlLoader },
            { loader: imgLoader }
          ]
        },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=image/svg+xml'].join('') },
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/font-woff'].join('') },
        { test: /\.woff2(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/font-woff'].join('') },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: [urlLoader, '&mimetype=application/octet-stream'].join('') },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?(\?(\w|\d)+)?(\#(\w|\d)+)?$/, loader: fileLoader },
        {
          test: /\.json$/,
          loader: 'json-loader'
        }
      ]
    }
  };
};
/* eslint-enable */
