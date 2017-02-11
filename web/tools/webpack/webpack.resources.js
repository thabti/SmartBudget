/* eslint-disable */
const path = require('path'),
  autoprefixer = require('autoprefixer'),
  env = require('./webpack.env');

module.exports = function (dirname) {
  const styleLoader = ['style-loader'].concat(env.isProd ? [] : ['?sourceMap']).join(''),
    cssLoaderParameters = env.isProd
      ? '&localIdentName=[hash:base64:32]'
      : '&sourceMap&localIdentName=[name]--[local]',
    cssLoader = ['css-loader?minimaze&camelCase&modules&importLoaders=1', cssLoaderParameters].join(''),
    sassLoader = ['sass-loader'].concat(env.isProd ? '' : '?sourceMap').join(''),
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
    module: {
      rules: [
        // take all less || sass files, compile them, and bundle them in with our js bundle
        // { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
        {
          test: /\.(s?)css$/,
          exclude: /node_modules/,
          use:[
            { loader: styleLoader },
            { loader: cssLoader },
            { loader: resolveUrlLoader },
            { loader: sassLoader, options: sassOptions },
            { loader: postcssLoader }
          ]
        },
        {
          test: /\.(s?)css$/,
          include: /node_modules/,
          use:[
            { loader: styleLoader },
            { loader: cssLoader },
            { loader: resolveUrlLoader },
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
    },
    postcss: function () {
      return [autoprefixer];
    }
  };
};
/* eslint-enable */
