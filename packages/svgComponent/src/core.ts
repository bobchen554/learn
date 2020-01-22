import path from 'path'

import { ParseSvg, ParseSvgProps } from './utils/parseSvg'
import { WriteSvgData } from './utils/WriteSvgData'
import { isCompilable, readFilePromise, isDir, readdirPromise, isFile } from './utils/fs'
import chalk from 'chalk'

interface SvgComponentConfig {
  baseUrl?: string,
  outDir?: string,
  parseSvgProps: ParseSvgProps,
  afterWriteFile?: (e: any) => void,
  afterParse?: (e: any) => void,
}

const defalutConfig: SvgComponentConfig = {
  parseSvgProps: {},
  baseUrl: '.',
  outDir: './dist',
}

class SvgComponent {

  _config: SvgComponentConfig

  parseSvgInstance: any

  writeSvgData:any

  constructor() {
    this.initConfig()
    this.parseSvgInstance = new ParseSvg(this._config.parseSvgProps)
    this.writeSvgData = new WriteSvgData()
  }

  initConfig() {
    const configPath = path.resolve(process.cwd(), 'svg.config.js')
    let fileConfig
    if (isFile(configPath)) {
      try {
        fileConfig = require(configPath)
        if (!fileConfig || typeof fileConfig !== 'object') {
          console.log(
            `Error loading ${chalk.bold('svg.config.js')}: should export an object.`,
          )
          fileConfig = null
        }
      } catch (e) {
        console.log(`Error loading ${chalk.bold('svg.config.js')}:`)
        throw e
      }
    }
    this._config = Object.assign(defalutConfig, fileConfig || {})
  }

  async parse(fliePath) {
    if (isCompilable(fliePath)) {
      const data = await readFilePromise(fliePath, 'utf-8')
      return this.parseSvgInstance.getNameAndPath(data)
    }
  }

  async run(pathName) {
    await this.parseAll(pathName)
    if (this._config.afterParse) {
      this._config.afterParse(this.parseSvgInstance)
    }
    const distPath = path.resolve(process.cwd(), this._config.outDir)
    if (!isDir(distPath)) {
      this.writeSvgData.mkdir(distPath)
    }
    const outDir = path.resolve(distPath, './index.js')
    this.parseSvgInstance.svgDatas = this.writeSvgData.serializeName(this.parseSvgInstance.svgDatas)
    this.writeSvgData.writeFile(
      outDir,
      this.writeSvgData.toString(this.parseSvgInstance.svgDatas),
      this._config.afterWriteFile,
    )
  }

  async parseAll(pathName) {
    const fliePath = path.resolve(process.cwd(), this._config.baseUrl, pathName)
    if (isDir(fliePath)) {
      const files = await readdirPromise(fliePath)

      await Promise.all(
        files.map(relativeFile => {
          const absFile = path.join('./', pathName, relativeFile)
          return this.parseAll(absFile)
        }),
      )
    } else {
      await this.parse(fliePath)
    }
  }

}

export {
  SvgComponent,
}
