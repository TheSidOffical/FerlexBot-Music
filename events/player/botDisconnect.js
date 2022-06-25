module.exports = {
    name: 'botDisconnect',
    execute (queue) {
        
        const { MessageEmbed } = require(`discord.js`)
        const BotDisconnected = new MessageEmbed()
         .setTitle('Bot Disconnected')
         .setDescription(`I was manually disconnected from the voice channel.`)
         .setColor("ORANGE")
         
         return queue.metadata.channel.send({ embeds: [BotDisconnected] })
    } 
}