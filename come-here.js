const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')

const RANGE_GOAL = 1 // get within this radius of the player

const followCommand = (bot, defaultMove) => (username, message) => {
    if (username === bot.username) return
    if (message !== 'come') return
    console.log('going!')
    const target = bot.players[username]?.entity
    const playerFilter = (entity) => entity.type === 'player'
    const playerEntity = bot.nearestEntity(playerFilter)

    if (!playerEntity) {
        bot.chat("I don't see you !")
        return
    }
    const { x: playerX, y: playerY, z: playerZ } = playerEntity.position
    const pos = playerEntity.position.offset(0, playerEntity.height, 0)
    bot.pathfinder.setMovements(defaultMove)
    console.log(JSON.stringify({playerX, playerY, playerZ}))
    bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
}

function addComeHere(bot) {
    bot.loadPlugin(pathfinder)

    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)

    bot.on('chat', followCommand(bot, defaultMove))

    // bot.chatFeatures.push(followCommand(bot, defaultMove))
    return bot
}

module.exports = {
    addComeHere
}