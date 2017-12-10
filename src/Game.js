const chalk = require('chalk');
const Room = require('./Room');
const Character = require('./Character');
const ask = require('./util/ask');
const say = require('./util/say');
const directions = require('./lang/directions');

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
        this.self = new Character(this.room);
        
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
            say('You are trapped!');
            return;
        }
        for (let exit of exits) {
            if (input === exit.dir || input === directions.fullname(exit.dir)) {
                this.room = this.rooms[exit.room];
                return;
            }
        }
        for (let action of (room.actions || [])) {
            if (input === action.phrase) {
                action.action(this, this.room);
                return;
            }
        }

        if (input === 'i' || input === 'inventory') {
            this.self.reportInventory();
            return;
        }

        const words = input.split(' ');
        if (words[0] === 'take') {
            for (let thing of room.things) {
                if (thing.name === words[1]) {
                    this.self.take(thing);
                    return;
                }
            }
        }

        say("You can't go that way.");
    }
    
};