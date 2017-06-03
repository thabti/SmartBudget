var parseCss = require('gulp-react-native-stylesheet-css/lib/parseCss');
var sass = require('node-sass');
var css = require('css');
var postcss = require('postcss');
var postcssJs = require('postcss-js');
var StyleSheet = equire('react-native').StyleSheet;
var splitterToken = '/*#ReactNativeWeb#*/';

module.exports = function (data) {
  console.log('css filename', arguments);
  return processCss(data);
};

function processCss(data) {
  console.log('css data:', data);
  var root = postcss.parse(data);
  var style = postcssJs.objectify(root);
  // var style = parseCss(data.replace(/\r?\n|\r/g, ""));
  console.log('css style typeof:', typeof style);
  console.log('css style:', style);
  // var styleObject = JSON.parse(style);
  return StyleSheet.create(style);
  // try {
  //   // var content = StyleSheet.create();
  //   console.log('StyleSheet:', StyleSheet);
  //   console.log('StyleSheet.create:', StyleSheet.create);
  //   var content = StyleSheet.create(style);
  //   // var content = StyleSheet.create(styleObject);
  //   console.log('css content typeof:', typeof content);
  //   console.log('css content:', content);
  //   return content;
  //   // return function () {
  //   //   return StyleSheet.create(styleObject);
  //   // };
  // } catch (e) {
  //   console.log('ERROR:', e);
  //   throw e;
  // }
  // return () => {
  //   return  require("react-native").StyleSheet.create(styleObject);
  // }
  // throw new Error('VAI FUNFAAAR!');
  // var content;
  // eval(['content = require("react-native").StyleSheet.create(', style, ');'].join(''));
  // eval(['content = styleSheet.create(', style, ');'].join(''));
  // var content = styleSheet.create(JSON.parse(style));
  // console.log('CONTENT');
  // console.log('CONTENT:', content);
  // console.log('CONTENT:', typeof content);
  // return ['module.exports = require("react-native").StyleSheet.create(', style, ');'].join('');
  // return content;
}
