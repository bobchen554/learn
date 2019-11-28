const path = require('path')
const reactModules = [
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    // 'react-custom-scrollbars',
    // 'react-dnd',
    // 'immutable', // Move to redux dll ?
    // '@shared/react-materials',
]
const commonModules = [
    'echarts',
    'babel-polyfill',
    'isomorphic-fetch',
    'js-cookie',
    'lodash',
    'moment',
    'query-string',
    // 'sa-sdk-javascript',
]
const reduxModules = [
    'react-redux',
    'redux',
    'redux-saga',
    'react-router-redux',
]

const dllRoot = __dirname
const context = __dirname

const common = {
  dll: {
    context: context,
    manifest: path.join(dllRoot, '../dist/vendor', 'common-manifest.json'),
  }
}

const react = {
  dll: {
    context: context,
    manifest: path.join(dllRoot, '../dist/vendor', 'react-manifest.json'),
  },
}

const redux = {
  dll: {
    context: context,
    manifest: path.join(dllRoot, '../dist/vendor', 'redux-manifest.json'),
  }
}

module.exports = {
    commonModules,
    reactModules,
    reduxModules,
    common,
    react,
    redux
}
