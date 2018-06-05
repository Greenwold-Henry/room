module.exports = class Thing {
    constructor({name, description = name, weight = 0, gettable = true, room, owner, actions = []}) {
        this.actions = actions;
        this.name = name;
        this.weight = weight;
        this.gettable = gettable;
        this.room = room;
        this.owner = owner;
        this.description = description;
        
    }

    move(room) {
        if (this.room !== room) {
            this.room.removeThing(this.name);
            this.room = room;
            room.things.push(this);
        }
    }
};