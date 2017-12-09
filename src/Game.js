const chalk = require('chalk');
const Room = require('./Room');
const ask = require('../ask');

module.exports = class Game {
    constructor(data) {
        this.rooms = {};
        for (let room of data.rooms) {
            this.rooms[room.name] = new Room(room);
        }
        
        this.startingRoom = data.startingRoom;
        this.prologue = data.prologue;
        this.name = data.name;
        
        
        this.room = this.rooms[this.startingRoom];
    }
    
    async start() {
        console.log(chalk.yellowBright(this.name));
        console.log(this.prologue);
        await this._playLoop();
    }
    
    async _playLoop() {
        while (true) {
            this.room.print();
            const input = await ask(chalk.blueBright('>> '));
            this.parseInput(input, this.room);
        }    
    }
    
    parseInput(input, room) {
        input = input.toLowerCase().trim();
        if (!room.exits) {
            console.log('You are trapped!');
            return;
        }
        for (let exit of room.exits) {
            if (input === exit[0]) {
                this.room = this.rooms[exit[1]];
                return;
            }
        }
        console.log("You can't go that way.");
    }
    
};