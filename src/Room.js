const chalk = require('chalk');
const directions = require('./directions');
const Thing = require('./Thing');

module.exports = class Room {
    constructor({name, description, exits = [], things = [], actions = []}) {
        this.name = name;
        this.description = description;
        this.exits = exits;
        for (let exitPair of Object.entries(this.exits)) {
            exitPair[1].dir = exitPair[0];
        }
        this.actions = actions;
        this.things = things.map(thing => new Thing({...thing, room: this}));
    }
    
    print() {
        console.log(chalk.green('\n' + this.name));
        console.log(this.description);

        for (let thing of this.things) {
            console.log(`There is a ${thing.description} here.`);
        }

        if (this.exits) {
            const nonHiddenExits = [];
            for (let exit of Object.values(this.exits)) {
                if (!exit.hidden) {
                    nonHiddenExits.push(exit);
                }
            }
            if (nonHiddenExits.length > 0) {
                if (nonHiddenExits.length === 1) {
                    console.log(`There is an exit ${directions.fullname(nonHiddenExits[0].dir)}`);
                } else {
                    console.log(`There are exits in the following directions: ${
                                nonHiddenExits.map((exit) => directions.fullname(exit.dir)).join(', ')
                            }`);
                }
            }
        }
    }
    
};