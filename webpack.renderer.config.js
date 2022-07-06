const path = require('path');
const rules = require('./webpack.rules');
const plugins = require('./webpack.plugins');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  module: {
    rules,
  },
  plugins: plugins,
  resolve: {
    alias: {
      '@apis': path.resolve(__dirname, 'src', 'apis'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@stores': path.resolve(__dirname, 'src', 'stores'),
      '@utils': path.resolve(__dirname, 'src', 'utils')
    },
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
  },
};
