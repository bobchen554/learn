const webpack = require('webpack')
const config = require('./webpack.prod')

const complier = webpack(config)

complier.run((...args) => {
    console.log(...args)
})