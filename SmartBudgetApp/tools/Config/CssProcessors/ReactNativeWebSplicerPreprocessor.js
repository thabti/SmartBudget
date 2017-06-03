var os = require('os');
var path = require("path");
var splitterToken = '/*#ReactNativeWeb#*/';
module.exports = function (data) {
  var piece = data.split(splitterToken);
  if (piece.length > 2) {
    throw new Error([
      'It is not possible to have more than one token splitter "',
      splitterToken,
      '" in your scss/css/sass file.'
    ].join(''));
  } else if (piece.length === 1) {
    console.log('')
    data = piece[0];
  } else {
    data = piece[0].split(os.EOL)
      .map(i => os.EOL).concat(os.EOL).concat(piece[1]).join('');
  }
  return data.toString('utf-8');
};
