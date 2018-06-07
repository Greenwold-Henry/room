const Game = require('../Game');
const data = require('../../data/magic');

const game = new Game(data);
game.start();
game.room.print();

const title = document.getElementById("gameTitle");
title.innerHTML = game.name;

window.onUserInput = (input) => {
    game.parseInput(input, game.room);
    game.room.print();
}
