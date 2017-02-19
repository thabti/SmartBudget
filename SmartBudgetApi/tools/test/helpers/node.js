require('source-map-support').install({
  handleUncaughtExceptions: false
});
require('babel-register')({
  babelrc: false,
  presets: ['es2015', 'stage-0'],
  plugins: ['transform-runtime', 'transform-es2015-modules-umd'],
  'env': {
    'test': {
      'plugins': ['istanbul']
    }
  }
});

const chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;
