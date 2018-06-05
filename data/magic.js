const say = require('../src/util/say');

module.exports = {
    aliases: {
        rabbit: 'bunny',
        lock: 'box',
        clipping: ['news', 'newspaper', 'paper'],
        seeds: ['packet', 'soil', 'bed','carrot seeds'],
        hat: 'magicians',
        read: 'look',
        move: ['shove', 'push'],
        can: 'watering',
        feed: ['give'],
        insecticide: 'cannister',
        nest: 'hornets'
    },

    name: "Escape from Mr. Mysterio's Magic House",
    startingRoom: 'Small Room',
    prologue: "Welcome to Escape from Mr. Mysterio's Magic House. Have fun on your magical adventure.",
    rooms: [{
        name: 'Small Room',
        description: 'Wow, this room is tiny. You can barely fit your legs in! There is a three-digit lock box fastened to the floor.',
        actions: [
            {
                phrase: 'set lock 241',
                action: (game, room) => {
                    if (! room.unlocked) {
                        room.unlocked = true;
                        say('The lock opens and reveals a bottle.');
                        room.addThing({
                            description: 'a bottle',
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
            description: 'a newspaper clipping',
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
            w: { room: 'Coat Room' },
            
        }
    },{
        name: 'Coat Room',
        description: ' This is a room where people put their clothes and belongings. A coat rack filled with many coats and other articles of clothing is in this room.',
        actions: [
            {
                phrase: 'move coats',
                action: (game, room) => {
                    if (! room.Pushed) {
                        room.Pushed = true;
                        say('There is a magicians top hat.');
                        room.addThing({
                            description: 'a magicians top hat',
                            name: 'hat',
                            actions: [
                                {
                                    phrase: 'put dust hat',
                                    action: (game, room) => {
                                        if (game.self.has('bottle')) {
                                            if (room.name === 'Stage Room') {
                                                say('Poof! A magical bunny rabbit hops out of the hat and refuses to move.');
                                                room.addThing({
                                                    description: 'a bunny rabbit',
                                                    name: 'rabbit',
                                                    gettable: false
                                                });
                                                game.self.destroyThing('bottle');
                                            } else {
                                                say('It creates a spark. Nothing else happens.');
                                            }
                                        }
                                        else {
                                            say("You don't have any dust.");
                                        }
                                    }
                                }
                            ]
                        });
                    }
                }
            }
        ],
        exits: {
            s: {room: 'Shed'},
            e: {room: 'Small Room'},
            se: {room: 'Garden'}
        }
    },{
        name: 'Shed',
        description: "This room is full of gardening tools. There is a doorway to the northwest that is blocked by a giant hornet's nest",
        things: [{
            description: 'a packet of carrot seeds',
            name: 'seeds'
        }],
        actions: [
            {
                phrase: ['spray nest', 'spray insecticide', 'put insecticide nest'],
                action: (game, room) => {
                    if (game.self.has('insecticide')) {
                        if (room.sprayed) {
                            say('You already sprayed it.');
                        } else {
                            room.sprayed = true;
                            say('The hornets buzzing around the nest drop out of the air.');
                            room.description = "This room is full of gardening tools. There is a shriveled hornet's nest in the doorway to the northwest.";
                            room.exits.nw.hidden = false;
                            room.exits.nw.blocked = false;
                        }
                    } else {
                        say("You don't have insecticide.");
                    }
                }
            }
        ],
        exits: {
            nw: {room: 'Hornets Nest', hidden: true, blocked: true},
            n: {room: 'Coat Room'},
            s: {room: 'Faucet Room'}
        }
    },{
        name: 'Garden',
        description: 'There is a big soil bed.',
        things: [{
            description: 'an empty watering can',
            name: 'can'
        }],
        actions: [
            {
                phrase: 'plant seeds',
                action: (game, room) => {
                    if (game.self.has('seeds')) {
                        if (!room.planted) {
                            say('You plant the carrot seeds in rows in the soil bed.');
                            room.planted = true;
                            game.self.destroyThing('seeds');
                        }
                    } else {
                        say("You don't have any seeds.");
                    }
                }
            },
            {
                phrase: 'water seeds',
                action: (game, room) => {
                    if (game.self.has('can')) {
                        const can = game.self.inventory.can;
                        if (!can.full) {
                            say('The can is empty.');
                            return;
                        }
                        if (!room.planted) {
                            say('There are no seeds planted.');
                            return;
                        }
                        say('You pour out the watering can onto the seeds.');
                        room.watered = true;
                        can.full = false;
                        can.description = 'an empty watering can';
                    } else {
                        say("You don't have a can.");
                    }
                }
            }, {
                phrase: 'wait',
                action: (game, room) => {
                    say('Time passes.');
                    if (room.watered) {
                        say('A carrot pops its head out of the soil.');
                        room.addThing({
                            description: 'a bright orange carrot',
                            name: 'carrot'
                        });
                        room.watered = false;
                        room.planted = false;
                    }
                }
            }
        ],
        exits: {
            nw: {room: 'Coat Room'},
            s: {room: 'Stage Room'}
        }
    },{
        name: 'Stage Room',
        description: 'There are two big turbines in the room. One of them has writing on it.',
        actions: [
            {
                phrase: 'read turbine',
                action: (game, room) => {
                    say('The turbine says "Magic generator."');
                }
            }, {
                phrase: 'feed carrot rabbit',
                action: (game, room) => {
                    if (game.self.has('carrot')) {
                        say('The bunny gobbles up the carrot in one bite.');
                        game.self.destroyThing('carrot');
                        const rabbit = room.findThing('rabbit');
                        rabbit.following = true;
                        game.onMove((game, room) => {
                            rabbit.move(room);
                        });
                    } else {
                        say("You don't have a carrot.")
                    }
                }
            }
        ],
        exits: {
            n: {room: 'Garden'},
            s: {room: 'Fancy Room'}
        }
    },{
        name: 'Fancy Room',
        description: 'A gold sliding door complete with ornate jewels blocks your path to the north. You notice that it is missing its largest central jewel.',
        things: [{
            description: 'a pair of scissors',
            name: 'scissors'
        }],
        exits: {
            //n: {room: 'Empty Room'},
            s: {room: 'Stage Room'}
        }
    },{
        name: 'Empty Room',
        description: 'A staircase leads down into the mist.',
        exits: {
            d: {room: 'Ship Room'},
            e: {room: 'Fancy Room'}
        }
    },{
        name: 'Ship Room',
        description: 'A ship is tied to a dock in the water. The knot that is holding it in place has become so old that it would be impossible to untie.',
        exits: {
            u: {room: 'Empty Room'}
        }
    },{
        name: 'Faucet Room',
        description: 'There is a sink with a leaky faucet here. To the south there is a small hole in the wall covered by a flap. It is too small for you to fit through.',
        actions: [{
            phrase: 'fill can',
            action: (game, room) => {
                if (game.self.has('can')) {
                    const can = game.self.inventory['can'];
                    if (!can.full) {
                        say("You fill the can up from the faucet.");
                        can.full = true;
                        can.description = "a full watering can"
                    } else {
                        say("The can is already full.")
                    }
                } else {
                    say("You don't have a can.")
                }
            }
        }],
        onEnter: [
            (game, room) => {
                if (room.findThing('rabbit') && !room.gotInsecticide) {
                    say('The bunny smells something interesting and runs through the flap. He returns with a cannister of insecticide');
                    room.gotInsecticide = true;
                    room.addThing({
                        description: 'a cannister of insecticide',
                        name: 'insecticide'
                    });
                }
            }
        ],
        exits: {
            n: {room: 'Shed'}
        }
    },{
        name: 'Hornets Nest',
        description: "The room is mostly empty.",
        things: [{
            description: 'a large jewel',
            name: 'jewel'
        }],
        exits: {
            se: {room: 'Shed'}
        }
    }]
};