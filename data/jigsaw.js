module.exports = {
    name: 'Jigsaw',
    startingRoom: 'Table Room',
    prologue: 'You wake up.',
    rooms: [{
        name: 'Table Room',
        description: 'You are in a room that has a table. On that table is a jigsaw piece',
        exits: [['n', 'Jigsaw Room']]
    },{
        name: 'Jigsaw Room',
        description: 'You are in a room with 499 pieces of a puzzle. One is missing',
        exits: [['s', 'Table Room']]
    }]
};