import FS from 'fs'

class WriteSvgData {

  serializeName(svgDatas) {
    return svgDatas.map(item => (
      item.name.indexOf('-') > -1 ? {
        name: item.name.replace(/-/i, '_'),
        d: item.d,
      } : item
    ))
  }
  toString(svgDatas) {
    let data = ''
    let exportStr = ''
    svgDatas.forEach(item => {
      data = data + `const ${item.name} = "${item.d}"\n`
      exportStr = exportStr + `  ${item.name},\n`
    })

    return `${data}export default {\n${exportStr}}`
  }

  mkdir(path) {
    FS.mkdirSync(path)
  }

  writeFile(path, data, callback) {
    FS.writeFile(path, data, (err) => {
      if (err) throw err
      if (callback) {
        callback()
      }
    })
  }
}

export {
  WriteSvgData,
}
