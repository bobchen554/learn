const chalk = require('chalk')
const msgPath = '.git/COMMIT_EDITMSG'
const msg = require('fs')
  .readFileSync(msgPath, 'utf-8')
  .trim()
const commitRE = /xxxx/

if (!commitRE.test(msg)) {
  console.error(
    `  ${chalk.bgRed.white(' ERROR ')} ${chalk.red(
      `invalid commit message format.`
    )}\n\n` +
      chalk.red(
        `  Proper commit message format is required for automated changelog generation. Examples:\n\n`
      ) + `    ${chalk.green(`feat(): add xxx`)}\n` +
      chalk.red(`  See xxxx for more details.\n`)
  )
  process.exit(1)
}






function GetInstance() {
  if (GetInstance.instance) return GetInstance.instance
  const instance = new function Instance() {
    // todo
  }
  GetInstance.instance = instance
  return instance
}

function genPrototypeLength(obj) {
  let _proto = obj.__proto__
  let length = 0
  while(_proto) {
    length ++
    _proto = _proto.__proto__
  }
}



