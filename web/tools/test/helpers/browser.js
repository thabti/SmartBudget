require('source-map-support').install({
  handleUncaughtExceptions: false,
  target: 'node'
});
require('babel-register')({
  babelrc: false,
  presets: ['es2015', 'stage-0', 'react'],
  plugins: ['transform-runtime', 'transform-es2015-modules-umd']
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
