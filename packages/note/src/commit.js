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
