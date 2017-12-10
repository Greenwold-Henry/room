const chalk = require('chalk');
const directions = require('./directions');

module.exports = class Room {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.exits = data.exits;
        for (let exitPair of Object.entries(this.exits)) {
            exitPair[1].dir = exitPair[0];
        }
        this.things = data.things;
    }
    
    print() {
        console.log(chalk.green('\n' + this.name));
        console.log(this.description);
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