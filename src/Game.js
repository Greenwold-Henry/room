const chalk = require('chalk');
const Room = require('./Room');
const ask = require('../ask');
const directions = require('./directions');

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
        
        this.validateDirections();
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
    
    validateDirections() {
        for (let room of Object.values(this.rooms)) {
            if (room.exits) {
                let exits = Object.values(room.exits);
                for (let exit of exits) {
                    if (!this.rooms[exit.room]) {
                       throw(chalk.red(`Error! Room: ${room.name} has an exit to a nonexistent room ${exit.room}`));
                    }
                }
            } 
        }
    }
    
    parseInput(input, room) {
        input = input.toLowerCase().trim();
        let exits = Object.values(room.exits);
        if (!exits || exits.length === 0) {
            console.log('You are trapped!');
            return;
        }
        for (let exit of exits) {
            if (input === exit.dir || input === directions.fullname(exit.dir)) {
                this.room = this.rooms[exit.room];
                return;
            }
        }
        for (let action of room.actions) {
            if (input === action.phrase) {
                action.action(this, this.room);
                return;
            }
        }

        console.log("You can't go that way.");
    }
    
};