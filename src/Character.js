module.exports = class Character {
    constructor(inventory = {}, room) {
        //this.inventory = inventory || {};
        //this.room = room;
    }

    take(thing) {
        thing.owner = this;
        this.inventory[thing.name] = thing;
        thing.room.things = thing.room.things.filter(otherThing => otherThing.name !== thing.name);
        thing.room = undefined;
    }

    inventory() {
        console.log('You are carrying:');
        for (let thing of Object.values(this.inventory)) {
            console.log('  ' + thing.description);
        }
    }

}