const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'dev' ? 'development' : 'production',
  entry: path.join(__dirname, '/ui/index.js'),
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../public/scripts'),
    clean: true,
    publicPath: '/scripts'
  }
};
