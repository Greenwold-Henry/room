const path = require('path');

module.exports = {
  entry: './src/web/web.js',
  output: {
    path: path.resolve(__dirname, 'docs/js'),
    filename: 'bundle.js'
  }
};