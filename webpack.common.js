const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    main: {
      import: './src/index.ts',
      dependOn: ['framework', 'shared'],
    },
    framework: [
      'react',
      'react-dom',
      'styled-components'
    ],
    shared: [
      'axios',
      'lodash'
    ]
  },
  optimization: {
    runtimeChunk: 'single',
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
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[contenthash].[ext]',
          outputPath: 'assets/imgs',
          publicPath: 'assets/imgs'
        },
      },
    ],
  },
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, 'src', 'apis'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
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
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
};