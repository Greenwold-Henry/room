const chalk = require('chalk');
const directions = require('./lang/directions');
const Thing = require('./Thing');
const output = require('./util/output');

module.exports = class Room {
    constructor({name, description, exits = [], things = [], actions = [], onEnter = []}) {
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
        if (!Array.isArray(onEnter)) {
            onEnter = [onEnter];
        }
        this.onEnter = onEnter;
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
        output('');
        output(this.name, 'roomName');
        output(this.description);

        for (let thing of this.things) {
            output(`There is ${thing.description} here.`);
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
                    output(`There is an exit ${directions.fullname(nonHiddenExits[0].dir)}`);
                } else {
                    output(`There are exits in the following directions: ${
                                nonHiddenExits.map((exit) => directions.fullname(exit.dir)).join(', ')
                            }`);
                }
            }
        }
    }
    
};