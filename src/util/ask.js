const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// jshint ignore:start
async function ask(q) {
    return new Promise((resolve, reject) => {
        rl.question(q, (data) => resolve(data));
    });
}
// jshint ignore:end

ask.close = () => rl.close();

module.exports = ask;