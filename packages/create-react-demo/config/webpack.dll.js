const path = require('path')
const webpack = require('webpack')
const {
  reactModules,
  commonModules,
  reduxModules
} = require('./config')

module.exports = {
// mode: "development || "production",
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  entry: {
    react: reactModules,
    common: commonModules,
    redux: reduxModules,
  },
  output: {
    path: path.join(__dirname, '../dist/vendor'),
    filename: '[name].[hash:8].vendor-dll.js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /zh-cn/),
    new webpack.DllPlugin({
      context: __dirname,
      path: path.join(__dirname, '../dist/vendor', '[name]-manifest.json'),
      name: '[name]_[hash]',
    }),
  ],
}
