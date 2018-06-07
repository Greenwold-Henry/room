const chalk = require('chalk');
const ask = require('../util/ask');

// jshint ignore:start
module.exports = async (game) => {
    while (true) {
        game.room.print();
        const input = await ask(chalk.blueBright('>> '));
        game.parseInput(input, game.room);
    }    
}
// jshint ignore:end