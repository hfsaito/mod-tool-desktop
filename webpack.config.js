const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
          test: /\.css$/,
          use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      }
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
      new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'body',
      template: path.resolve(__dirname, 'src', 'index.ejs'),
      templateParameters: {
        title: 'Template',
      }
    })
  ],
  output: {
    publicPath: '/',
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};