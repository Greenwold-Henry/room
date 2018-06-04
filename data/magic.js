const say = require('../src/util/say');

module.exports = {
    name: "Escape from Mr. Mysterio's Magic House",
    startingRoom: 'Small Room',
    prologue: "Welcome to Escape from Mr. Mysterio's Magic House. Have fun on your magical adventure.",
    rooms: [{
        name: 'Small Room',
        description: 'Wow, this room is tiny. You can barely fit your legs in!',
        //description: 'There is a newspaper clipping on the ground. It says two for one. A 3 digit lock box lies on a table.',
        actions: [
            {
                phrase: 'set lock to 241',
                action: (game, room) => {
                    if (! room.unlocked) {
                        room.unlocked = true;
                        say('The lock opens and reveals a bottle.');
                        room.addThing({
                            description: 'bottle',
                            name: 'bottle',
                            actions: [
                                {
                                    phrase: 'read bottle',
                                    action: (game, room) => {
                                        say('The bottle says "Magic dust"');
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        ],
        things: [{
            description: 'Newspaper clipping',
            name: 'clipping',
            actions: [
                {
                    phrase: 'read clipping',
                    action: (game, room) => {
                        say('The clipping says "Two for one!"');
                    }
                }
            ]
        }],
        exits: {
            n: { room: 'Small Room' },
            //e: { room: 'Troll Room' }
        }
    }]
};