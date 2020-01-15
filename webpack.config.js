const path = require('path');

process.env.NODE_ENV = 'development';

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: ['./samples/src/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, 'samples/'),
    compress: false,
    watchContentBase: true,
    hot: true,
    port: 8700,
    historyApiFallback: {
      disableDotRule: true
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: [
          '@babel/preset-env',
          '@babel/preset-react',
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
