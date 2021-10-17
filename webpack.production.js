const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const theBaseConfig = require('./webpack.base');

const theProductionConfig = {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { publicPath: '../' },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gir)$/i,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new ImageMinimizerPlugin({
      minimizerOptions: {
        plugins: [['optipng', { optimizationLevel: 5 }]],
      },
    }),
  ],
};

module.exports = merge(theBaseConfig, theProductionConfig);
