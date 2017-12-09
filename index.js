const ask = require('./ask');
const chalk = require('chalk');
console.log();
main().then(() => {console.log(); ask.close();});

async function main() {

    console.log('hi');
    let ans = await ask(chalk.yellow('How did it happen? '));
    console.log(`Answer ${chalk.red(ans)}`);

}