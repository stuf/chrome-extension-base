const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const { NODE_ENV } = process.env;

const isProduction = NODE_ENV === 'production';

//

const ROOT_PATH = path.resolve(__dirname, '..');
const SRC_PATH = path.join(ROOT_PATH, 'src');
const BUILD_PATH = path.join(ROOT_PATH, 'build');

//

module.exports = {
  entry: {
    vendor: ['react', 'react-dom', 'karet', 'karet.util', 'ramda', 'kefir', 'partial.lenses'],
    devtools: path.join(SRC_PATH, 'devtools.js'),
    panel: path.join(SRC_PATH, 'panel.js'),
    background: path.join(SRC_PATH, 'background.js')
  },
  output: {
    filename: '[name].js',
    path: BUILD_PATH
  },
  devtool: !isProduction && 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      chunks: ['devtools'],
      hash: true
    }),
    new HtmlWebpackPlugin({
      filename: 'panel.html',
      chunks: ['vendor', 'panel'],
      hash: true
    })
  ]
};
