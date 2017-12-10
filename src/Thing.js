module.exports = class Thing {
    constructor({name, description = name, weight = 0, gettable = true, room, owner}) {
        this.name = name;
        this.weight = weight;
        this.gettable = gettable;
        this.room = room;
        this.owner = owner;
        this.description = description;
    }
};