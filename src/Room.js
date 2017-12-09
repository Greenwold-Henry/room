const chalk = require('chalk');

module.exports = class Room {
    constructor(data) {
        this.name = data.name;
        this.description = data.description;
        this.exits = data.exits;  // Exit has a direction, and room
        this.things = data.things;
    }
    
    print() {
        console.log(chalk.green('\n' + this.name));
        console.log(this.description);
        if (this.exits) {
            if (this.exits.length === 1) {
                console.log(`There is an exit to the ${this.exits[0][0]}`);
            } else {
                console.log(`There are exits in the following directions ${
                            this.exits.map((exit) => exit[0]).join(', ')
                        }`);
            }
        }
    }
    
};