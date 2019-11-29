const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
var AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const { getVendorJsName } = require('./config')
const {
    react,
    common,
    redux
  } = require('./config')

module.exports = {
    entry: {
        index: path.resolve(process.cwd(), './src/index.tsx')
    },
    output: {
        publicPath: "/",
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].[hash:8].js',
        library: '[name]_[hash]',
    },
    resolve: {
        // 指定要解析的文件扩展名
        extensions: [".jsx", ".js", ".json", '.ts', '.tsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
                exclude: /node_modules/,
                use: ["url-loader?limit=8192"]
            },
            {
                enforce: "pre",
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'eslint-loader',
                    options: {
                        emitError: true,
                        emitWarning: true,
                        failOnError: true
                    }
                }]
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css)?$/,
                use: [
                    "style-loader/url",
                    {
                        loader: "css-loader",
                        options: {
                            minimize: {
                                safe: true,
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        }
                    },
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            {
                test: /\.(tsx|ts)?$/,
                use: ['ts-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        port: 8080
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html',
        }),
        // new InjectScript({
        //     content: getVendorJsName(path.join(__dirname, '../dist/vendor')),
        // }),
        new AddAssetHtmlPlugin(getVendorJsName(path.join(__dirname, '../dist/vendor'))
        .map(name => {
            return {
              filepath: require.resolve(path.join(__dirname, `../dist/vendor/${name}`)),
              includeSourcemap: false
            }
          })),
        new webpack.DllReferencePlugin(common.dll),
        new webpack.DllReferencePlugin(react.dll),
        new webpack.DllReferencePlugin(redux.dll),
    ],
    
}