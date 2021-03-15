// This is an example that uses mineflayer-pathfinder to showcase how simple it is to walk to goals
const readline = require("readline");
const util = require('util');

const chalk = require('chalk');
const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer

async function askForHostAndPort() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    // Prepare readline.question for promisification
    rl.question[util.promisify.custom] = (question) => {
        return new Promise((resolve) => {
            rl.question(question, resolve);
        });
    };

    const question = util.promisify(rl.question).bind(rl);
    try {
        const host = await question('What is the host?');
        const port = await question('What is the port?');
        console.log(chalk.green({ host, port}))
        return { host, port }
    } catch (e) {
        console.error(chalk.red(e))
    }

}

function createBot(host, port) {
    return new Promise( (resolve) => {
        const defaultOptions = {
            colorsEnabled: true,
            username: 'roy'
        }
        const bot = mineflayer.createBot({
            host,
            port,
            ...defaultOptions
        })

        bot.once('spawn', () => {
            mineflayerViewer(bot, { port: 3007, firstPerson: true })
            console.log('Roy Bot is ready!')
            resolve(bot)
        })
    })
}

function addChatCommandHandlingToBot(bot) {
    bot.chatFeatures = [];

    // bot.on('chat', (username, message, ...rest) => {
    //     console.log( 'CHAT:', username, message )
    //     console.log(bot.chatFeatures.length, bot.chatFeatures)
    //     bot.chatFeatures.forEach( fn => fn(username, message, ...rest) )
    // })

    return bot;
}

async function startBot() {

    const { host, port } = await askForHostAndPort()
    return await createBot(host, port).then(addChatCommandHandlingToBot);
}

module.exports = {
    startBot
}