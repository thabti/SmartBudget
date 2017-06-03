require('source-map-support').install({
  handleUncaughtExceptions: false
});
process.env.NODE_ENV = 'test';
process.env.PLATFORM_ENV = 'web';
require('babel-register')({
  babelrc: false,
  presets: [["es2015", { "modules": false }], 'react', 'stage-0'],
  plugins: [
    "./tools/Config/CssProcessors/getStyleObjectFromSass.js",
    'transform-runtime', 'transform-es2015-modules-umd', ['module-resolver', {
    'root': ['./'],
    'alias': {
      'react-native': './tools/ReactNativeWeb'
    }
  }]],
  'env': {
    'test': {
      'plugins': ['istanbul']
    }
  }
});

const jsdom = require('jsdom').jsdom;
const chai = require('chai');

global.expect = chai.expect;
global.assert = chai.assert;

const exposedProperties = ['window', 'navigator', 'document'];
const document = jsdom('');
global.document = document;
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global['Event'] = global['Event'] || function Event() { };
global['Element'] = global['Element'] || function Element() { };
global['HTMLDocument'] = global['HTMLDocument'] || function HTMLDocument() { };

global.navigator = {
  userAgent: 'node.js'
};
