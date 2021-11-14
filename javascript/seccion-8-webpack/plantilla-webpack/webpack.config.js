const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  output: { clean: true }, // regenera el build
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: false
        }
      }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    })
  ]
}