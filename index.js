const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
const { startBot } = require('./setupStandardBot');
const { addComeHere } = require('./come-here');
const { startChat } = require('./cliChatSetup');
const chalk = require('chalk');

function addLookAt(bot) {
    function lookAtNearestPlayer () {
        const playerFilter = (entity) => entity.type === 'player'
        const playerEntity = bot.nearestEntity(playerFilter)

        if (!playerEntity) return

        const pos = playerEntity.position.offset(0, playerEntity.height, 0)
        bot.lookAt(pos)
    }

    bot.on('physicTick', lookAtNearestPlayer)
    return bot
}

startBot()
    .then( addLookAt )
    .then( addComeHere )
    .then( startChat )
    .catch( e => console.error(chalk.red(e), e) )
