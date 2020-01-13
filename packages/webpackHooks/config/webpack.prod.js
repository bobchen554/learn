const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const { getVendorScript } = require('./config')
// const InjectScript = require('./injectScript')
const finishModules = require('./testHooks/finishModules')

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
        extensions: [".jsx", ".js", ".json", '.ts', '.tsx'],
        alias: {
            '@': path.join(__dirname, '..', 'src'),
        }
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["index.html", "index*.js", "index*.css"],
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html',
        }),
        new finishModules(),
    ],
}