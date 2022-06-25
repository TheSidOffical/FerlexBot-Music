module.exports = {
    name: 'channelEmpty',
    execute (queue) {
        
        const { MessageEmbed } = require(`discord.js`)
        const BotDisconnected = new MessageEmbed()
         .setTitle('Bot Disconnected')
         .setDescription(`Nobody is in the voice channel, leaving the voice channel.`)
         .setColor("ORANGE")
         
         return queue.metadata.channel.send({ embeds: [BotDisconnected] })
    } 
}