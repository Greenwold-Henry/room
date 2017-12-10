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

};