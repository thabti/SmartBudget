module.exports = {
  isTest: process.env.NODE_ENV === 'test',
  isProd: process.env.NODE_ENV === 'production',
  isDev: process.env.NODE_ENV === 'dev',
  isIOS: process.env.PLATFORM_ENV === 'ios',
  isAndroid: process.env.PLATFORM_ENV === 'android',
  isWeb: ['ios', 'android'].indexOf(process.env.PLATFORM_ENV) === -1
};
