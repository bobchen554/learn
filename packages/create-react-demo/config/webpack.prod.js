const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')
const {
    react,
    common,
    redux
  } = require('./config')

module.exports = {
    entry: {
        index: path.resolve(process.cwd(), './src/index.js')
    },
    output: {
        publicPath: "/",
        path: path.join(process.cwd(), 'dist'),
        filename: '[name].[hash:8].js',
        library: '[name]_[hash]',
    },
    resolve: {
        // 指定要解析的文件扩展名
        extensions: [".jsx", ".js", ".json"],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    mode:'production',
    module: {
        rules: [
            // 图片文件小于8192byte时，转换为base64字符串
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
    plugins:[
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template:'public/index.html',
        }),
        new webpack.DllReferencePlugin(common.dll),
        new webpack.DllReferencePlugin(react.dll),
        new webpack.DllReferencePlugin(redux.dll),
    ],
}