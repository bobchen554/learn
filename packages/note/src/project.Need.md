# 构建
webpack 打包
1. loader
>> "url-loader?limit=8192"    test: /\.(gif|png|jpg|jpeg|woff|woff2|eot|ttf|svg)(\?t=\d+)?$/,
>> 'ts-loader'  test: ts  tsconfig.json
>> "style-loader", "css-loader", "less-loader" test: less  
>> 'style-loader', 'css-loader','postcss-loader','sass-loader'  test: scss
>> "babel-loader" test: js jsx vue .babelrc
>> 'eslint-loader'
2. plugins
>> HtmlWebpackPlugin happyPack  CleanWebpackPlugin webpack.DllReferencePlugin AddAssetHtmlPlugin
代码规范
eslint .eslintrc.json
git commit检查  husky >> hooks >> pre-commit >> npm run lint
.editorconfig:
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
tab_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
max_line_length = 100
[*.md]
trim_trailing_whitespace = false

.gitignore:

.DS_Store
node_modules
dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw*

.npmrc:
always-auth=true
registry=
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

vscode .setting:

{
    "eslint.enable": true,
    "eslint.autoFixOnSave": true,
    "eslint.run": "onType",
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue",
            "typescript",
            ".tsx"
        ]
    },
    "eslint.validate": [
        {
            "language": "vue",
            "autoFix": true
        },
        {
            "language": "typescript",
            "autoFix": true
        },
        {
            "language": "react",
            "autoFix": true
        },
        {
            "language": "typescriptreact",
            "autoFix": true
        },
    ],
    "editor.codeActionsOnSave": {
        "source.fixAll.tslint": true
    },
}
3. 单元测试 jest

4. 部署

