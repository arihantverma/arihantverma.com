const path = require('path');
const webpack = require('webpack')
const dotenv = require('dotenv').config( {
  path: path.join(__dirname, '.env')
});

module.exports = (env) => ({
  entry: './js/main.js',
  output: {
    path: path.resolve(__dirname, '_site/assets'),
    filename: 'site-main.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": JSON.stringify({
        ELEVENTY_ENV: env.ELEVENTY_ENV
      })
    })
  ],
  devtool: process.env.ELEVENTY_ENV === "production" ? "cheap-source-map" : "source-map"
});

