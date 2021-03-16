const readline = require("readline");
//The docs are going to help a lot
// https://nodejs.org/api/readline.html#readline_rl_prompt_preservecursor

const startChat = (bot) => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.write('Chat CLI has been started! You can now speak for the bot\n')

    rl.on('line', (line) => {
        try {
            console.log('Double Checking:', line)
            bot.chat(line);
        }catch (e) {
            console.log('Something Went Ary')
            console.error(e)
        }
    }).on('close', () => {
        console.log('Have a great day!');
        process.exit(0);
    });

    return bot;
}
module.exports = {
    startChat
}