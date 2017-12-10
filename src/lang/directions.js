module.exports = {
    fullname: function(partial) {
        switch (partial) {
            case 'n':
                return 'north';
            case 's':
                return 'south';
            case 'e':
                return 'east';
            case 'w':
                return 'west';
            case 'ne':
                return 'northeast';
            case 'se':
                return 'southeast';
            case 'sw':
                return 'southwest';
            case 'nw':
                return 'northwest';
            case 'u':
                return 'up';
            case 'd':
                return 'down';
        }
        return partial;
    }
};