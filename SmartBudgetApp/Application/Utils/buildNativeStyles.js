import reactNativeCSS from 'react-native-css';
import sass from 'node-sass';
import { StyleSheet } from 'react-native';
const splitterToken = '/*#ReactNativeWeb#*/';

function processSass(data) {
  console.log('sass data:', data);
  data = data.split(splitterToken)[0];
  return sass.renderSync({
    data: data
  }).css.toString('utf-8');
}

function buildNativeStyles(data) {
  return reactNativeCSS(
    processSass(data),
  );
}

function buildStyles(styles) {
  if (process.env.PLATFORM_ENV === 'web') {
    return styles;
  }
  return getNativeStyles(values);
}

export default buildStyles;
