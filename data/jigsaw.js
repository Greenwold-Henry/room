const say = require('../src/util/say');

module.exports = {
    name: 'Jigsaw',
    startingRoom: 'Table Room',
    prologue: 'You wake up.',
    rooms: [{
        name: 'Table Room',
        description: 'You are in a room that has a table.',
        things: [{
            description: 'Jigsaw puzzle piece',
            name: 'piece'
        },{
            description: 'List',
            name: 'list'
        }],
        exits: {
            n: { room: 'Jigsaw Room' },
            e: { room: 'Troll Room' }
        }
    },{
        name: 'Jigsaw Room',
        description: 'You are in a room with a jigsaw puzzle box.',
        exits: {s: {room: 'Table Room'}}
    },{
        name: 'Troll Room',
        description: 'You are in a room with a giant troll who makes grunting noises. There is a cord hanging down',
        exits: {
            w: {room: 'Table Room'},
            u: {room: 'Forest', hidden: true}
        },
        actions: [
            {
                phrase: 'pull cord',
                action: (game, room) => {
                    say('A trap door in the ceiling opens up.');
                    room.exits.u.hidden = false;
                }
            }
        ]
    },{
        name: 'Forest',
        description: 'You are in a forest.',
        exits: {d: {room: 'Troll Room'}}
    }]
};