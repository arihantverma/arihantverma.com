const path = require('path');

module.exports = {
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, '_site/assets'),
    filename: 'site-main.js'
  },
  devtool: process.env.ELEVENTY_ENV === "production" ? "cheap-source-map" : "source-map"
};

