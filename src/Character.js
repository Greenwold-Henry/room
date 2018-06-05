const say = require('./util/say');

module.exports = class Character {
    constructor(room, inventory = {}) {
        this.inventory = inventory || {};
        this.room = room;
    }

    take(thing) {
        thing.owner = this;
        this.inventory[thing.name] = thing;
        thing.room.things = thing.room.things.filter(otherThing => otherThing.name !== thing.name);
        thing.room = undefined;
        say(`You took the ${thing.name}.`);
    }
    
    drop(thing) {
        thing.owner = undefined;
        delete this.inventory[thing.name];
        this.room.things.push(thing);
        thing.room = this.room;
        say(`You dropped the ${thing.name}.`);
    }

    reportInventory() {
        const i = Object.keys(this.inventory);
        if (i.length === 0) {
            say('You have nothing.');
            return;
        }
        
        say('You are carrying');
        for (let thing of Object.values(this.inventory)) {
            say('  ' + thing.description);
        }
    }

    has(thingName) {
        return this.inventory[thingName] !== undefined;
    }

};