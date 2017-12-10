module.exports = {
    name: 'Jigsaw',
    startingRoom: 'Table Room',
    prologue: 'You wake up.',
    rooms: [{
        name: 'Table Room',
        description: 'You are in a room that has a table. On that table is a jigsaw piece',
        exits: {
            n: { room: 'Jigsaw Room' },
            e: { room: 'Troll Room' }
        }
    },{
        name: 'Jigsaw Room',
        description: 'You are in a room with 499 pieces of a puzzle. One is missing',
        exits: {s: {room: 'Table Room'}}
    },{
        name: 'Troll Room',
        description: 'You are in a room with a giant troll who makes grunting noises and says hello dad. There is a cord hanging down',
        exits: {
            w: {room: 'Table Room'},
            u: {room: 'Forest', hidden: true}
        },
        actions: [
            {
                phrase: 'pull cord',
                action: (game, room) => {
                    room.exits['u'].hidden = false;
                }
            }
        ]
    },{
        name: 'Forest',
        description: 'You are in a forest.',
        exits: {d: {room: 'Troll Room'}}
    }]
};