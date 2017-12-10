const Game = require('./src/Game');
const data = require('./data/jigsaw');
console.log();
main().then(() => {console.log(); ask.close();});


// jshint ignore:start
async function main() {
    const game = new Game(data);
    await game.start();
}
// jshint ignore:end