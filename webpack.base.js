const HTMLWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

const config = {
  entry: {
    theMain: './src/index.js',
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gir)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    assetModuleFilename: 'images/[name][ext]',
    clean: true,
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
  },

  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      title: 'Tudoui Le Daq',
    }),
  ],
};

module.exports = config;
