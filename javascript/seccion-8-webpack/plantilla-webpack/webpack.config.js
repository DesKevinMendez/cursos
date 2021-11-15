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
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
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