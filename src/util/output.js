const chalk = require('chalk');

// say => yellow

const inBrowser = typeof window !== 'undefined';

function escapeHtml(unsafe) {
    return unsafe
     .replace(/&/g, "&amp;")
     .replace(/</g, "&lt;")
     .replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;")
     .replace(/'/g, "&#039;");
}

if (inBrowser) {
    module.exports = (output, type) => {{
        for (let line of output.split('\n')) {
            /* Typical Creation and Setup A New Orphaned Element Object */
            const newElement = document.createElement('div');
            newElement.innerHTML = escapeHtml(line);
            if (type) {
                newElement.classList.add(type);
            }

            /* Add NewElement */
            const outputArea = document.getElementById("outputArea");

            const spacer = document.createElement('div');
            spacer.innerHTML = "&nbsp;";
            outputArea.appendChild(spacer);

            outputArea.appendChild(newElement);
            outputArea.scrollTop = outputArea.scrollHeight;
        }
    }};
} else {
    module.exports = (output, type='plain') => {{
        switch (type) {
            case 'say':
                console.log(chalk.yellow(output));
                break;
            case 'title':
                console.log(chalk.yellowBright(output));
                break;
            case 'roomName':
                    console.log(chalk.green(output));
                    break;
            case 'plain':
                    console.log(output);
                    break;
            default:
                console.log(output);
        }
    }};
}
