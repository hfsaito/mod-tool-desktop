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
    alias: {
      '@apis': path.resolve(__dirname, 'src', 'apis'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@stores': path.resolve(__dirname, 'src', 'stores'),
      '@utils': path.resolve(__dirname, 'src', 'utils')
    },
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