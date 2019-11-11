const path = require('path')
const webpack = require('webpack')

module.exports = {
    // mode: "development || "production",
      context: __dirname,
      resolve: {
        extensions: ['.js', '.jsx'],
      },
      entry: {
        index: path.resolve(__dirname, './src/index.js'),
      },
      output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].[hash:8].js',
        library: '[name]_[hash]',
      },
      plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: path.resolve(__dirname, 'vendor/react-manifest.json')
        })
      ],
      target: 'node'
    }
    