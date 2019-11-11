const path = require('path')
const webpack = require('webpack')

module.exports = {
    // mode: "development || "production",
      context: __dirname,
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      entry: {
        react: ['react'],
        common: ['antd'],
        redux: ['redux'],
      },
      output: {
        path: path.join(__dirname, 'vendor'),
        filename: '[name].[hash:8].vendor-dll.js',
        library: '[name]_[hash]',
      },
      plugins: [
        new webpack.DllPlugin({
          path: path.join(__dirname, 'vendor', '[name]-manifest.json'),
          name: '[name]_[hash]',
        }),
      ],
      target: 'node'
    }
    