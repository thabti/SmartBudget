var reactNativeCSS = require('react-native-css');

module.exports = function getScopedName(name, filepath, css) {
  console.log('GENERATING NAME:', css);
  return reactNativeCSS(css);
}