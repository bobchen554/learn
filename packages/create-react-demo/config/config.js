const path = require('path')
const fs = require('fs')
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
  },
  file: {
    filepath: path.join(dllRoot, '../dist/vendor', 'redux.*.vendor-dll.js'),
  },
}

const react = {
  dll: {
    context: context,
    manifest: path.join(dllRoot, '../dist/vendor', 'react-manifest.json'),
  },
  file: {
    filepath: path.join(dllRoot, '../dist/vendor', 'redux.*.vendor-dll.js'),
  },
}

const redux = {
  dll: {
    context: context,
    manifest: path.join(dllRoot, '../dist/vendor', 'redux-manifest.json'),
  },
  file: {
    filepath: path.join(dllRoot, '../dist/vendor', 'redux.*.vendor-dll.js'),
  },
}

function getVendorJsName(path) {
  const reg = /.js$/ig
  return fs.readdirSync(path).filter(item => reg.test(item))
}

function getVendorScript(path) {
  getVendorJsName(path)
  .map(item => `<script type="text/javascript" src="./vendor/${item}"></script>`)
  .join('\n')
}

module.exports = {
    commonModules,
    reactModules,
    reduxModules,
    common,
    react,
    redux,
    getVendorScript,
    getVendorJsName
}
