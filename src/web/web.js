const Game = require('../Game');
const data = require('../../data/magic');

const game = new Game(data);
game.start();
game.room.print();

window.onUserInput = (input) => {
    game.parseInput(input, game.room);
    game.room.print();
}
