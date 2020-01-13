var path = require('path');
var webpack = require('webpack');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'eval',
  entry: ['./samples/src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: ''
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'samples/'),
    compress: false,
    watchContentBase: true,
    hot: true,
    port: 8700
  },
  node: {
    module: 'empty',
    dgram: 'empty',
    dns: 'mock',
    fs: 'empty',
    http2: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-react",
          {
            plugins: [
              '@babel/plugin-proposal-class-properties'
            ]
          }
        ]
      }
    }]
  },
  plugins: [
  ]
};
