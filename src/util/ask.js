const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function ask(q) {
    return new Promise((resolve, reject) => {
        rl.question(q, (data) => resolve(data));
    });
}

ask.close = () => rl.close();

module.exports = ask;