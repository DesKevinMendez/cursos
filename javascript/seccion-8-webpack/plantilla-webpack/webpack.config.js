const htmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')

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
        exclude: /styles.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /styles.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpeg|jpg|gif)$/,
        use: 'file-loader'
      }
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[fullhash].css',
      ignoreOrder: false,
    }),
    new CopyWebpackPlugin(
      {
        patterns: [
          { from: 'src/assets/', to: 'assets/' }
        ]
      }
    )
  ]
}