const chalk = require('chalk');
const Room = require('./Room');
const Character = require('./Character');
const ask = require('./util/ask');
const say = require('./util/say');
const directions = require('./lang/directions');
const junkWords = require('./lang/junkWords');
const aliases = require('./lang/aliases');

function toArray(input) {
    return Array.isArray(input) ? input : [input];
}

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
        this.onMoveCallbacks = [];
        this.aliases = {};
        this.prepareAliases(aliases);
        this.prepareAliases(data.aliases);
        
        this.validateDirections();
    }
    
    // jshint ignore:start
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
    // jshint ignore:end
    
    onMove(action) {
        this.onMoveCallbacks.push(action);
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

    prepareAliases(data) {
        if (!data) {
            return;
        }
        for (let root of Object.keys(data)) {
            let aliases = toArray(data[root]);
            for (let alias of aliases) {
                this.aliases[alias] = root;
            }
        }
    }
    
    removeJunk(input) {
        const junkObj = {};
        for (let word of junkWords) {
            junkObj[word] = true;
        }
        return input.split(' ').filter(word => !junkObj[word]).join(' ');
    }

    resolveAliases(input) {
        return input.split(' ').map(word => this.aliases[word] || word).join(' ');
    }


    parseInput(input, room) {
        input = input.toLowerCase().trim();
        input = input.replace(/\W+/g, ' ');
        input = this.removeJunk(input);
        input = input.replace(/\W+/g, ' '); // In case new spaces are added
        input = this.resolveAliases(input);
        let exits = Object.values(room.exits);
        if (!exits || exits.length === 0) {
            say('You are trapped!');
            return;
        }
        for (let exit of exits) {
            if (!exit.blocked && (input === exit.dir || input === directions.fullname(exit.dir))) {
                this.room = this.rooms[exit.room];
                this.self.room = this.room;
                for (let action of this.onMoveCallbacks) {
                    action(this, this.room);
                }
                for (let action of this.room.onEnter) {
                    action(this, this.room);
                }
                return;
            }
        }
        for (let action of (room.actions || [])) {
            const phrases = toArray(action.phrase);
            for (let phrase of phrases) {
                if (input === phrase) {
                    action.action(this, this.room);
                    return;
                }
            }
        }
        
        for (let thing of Object.values(this.self.inventory)) {
            for (let action of (thing.actions || [])) {
                const phrases = toArray(action.phrase);
                for (let phrase of phrases) {
                    if (input === phrase) {
                        action.action(this, this.room);
                        return;
                    }
                }
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
                    if (!thing.gettable) {
                        say(`You can't take the ${thing.name}.`);
                        return;
                    }
                    this.self.take(thing);
                    return;
                }
            }
            say(`You see no ${words[1]} here.`);
            return;
        }
        if (words[0] === 'drop') {
            for (let thing of Object.values(this.self.inventory)) {
                if (thing.name === words[1]) {
                    this.self.drop(thing);
                    return;
                }
            }
            say(`You have no ${words[1]}.`);
            return;
        }

        say("You can't do that.");
    }
    
};