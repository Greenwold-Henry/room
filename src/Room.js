const chalk = require('chalk');
const directions = require('./lang/directions');
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
        this.things = [];
        for(let thing of things) {
            this.addThing(thing);
        }
    }

    addThing(thing) {
        this.things.push(new Thing({...thing, room: this}));
    }

    removeThing(thingName) {
        this.things = this.things.filter(thing => thing.name !== thingName);
    }

    findThing(thingName) {
        for (let thing of this.things) {
            if (thing.name === thingName) {
                return thing;
            }
        }
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