const Game = require('./src/Game');
const data = require('./data/magic');
const ask = require('./src/util/ask');
const playloop = require('./src/node/playloop');

console.log();
main().then(() => {console.log(); ask.close();});

// jshint ignore:start
async function main() {
    const game = new Game(data);
    game.start();
    await playloop(game);
}
// jshint ignore:end