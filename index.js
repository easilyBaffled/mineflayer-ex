const mineflayer = require('mineflayer')
const mineflayerViewer = require('prismarine-viewer').mineflayer
console.log('test')
const bot = mineflayer.createBot({
  host: '185.228.139.97',
  port: 25564,
  username: 'lookAt_Bot'
})

function lookAtNearestPlayer () {
  const playerFilter = (entity) => entity.type === 'player'
  const playerEntity = bot.nearestEntity(playerFilter)

  if (!playerEntity) return

  const pos = playerEntity.position.offset(0, playerEntity.height, 0)
  bot.lookAt(pos)
}

bot.on('physicTick', lookAtNearestPlayer)

bot.once('spawn', () => {
    mineflayerViewer(bot, { port: 3007, firstPerson: true })
})