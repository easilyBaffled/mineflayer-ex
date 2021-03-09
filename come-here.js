// This is an example that uses mineflayer-pathfinder to showcase how simple it is to walk to goals

const mineflayer = require('mineflayer')
const { pathfinder, Movements, goals: { GoalNear } } = require('mineflayer-pathfinder')
const mineflayerViewer = require('prismarine-viewer').mineflayer

if (process.argv.length < 4 || process.argv.length > 6) {
    console.log('Usage : node gps.js <host> <port> [<name>] [<password>]')
    process.exit(1)
}

const bot = mineflayer.createBot({
    host: process.argv[2],
    port: parseInt(process.argv[3]),
    username: process.argv[4] ? process.argv[4] : 'gps',
    password: process.argv[5]
})

const RANGE_GOAL = 1 // get within this radius of the player

bot.loadPlugin(pathfinder)

bot.once('spawn', () => {
    const mcData = require('minecraft-data')(bot.version)
    const defaultMove = new Movements(bot, mcData)

    bot.on('chat', (username, message) => {
        if (username === bot.username) return
        if (message !== 'come') return
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
        bot.pathfinder.setGoal(new GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
    })
})

bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3007, firstPerson: true })
})
