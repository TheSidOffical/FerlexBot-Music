module.exports = {
    name: 'queueEnd',
    execute (queue) {
        
        const { MessageEmbed } = require(`discord.js`)
        const QueueEnded = new MessageEmbed()
         .setTitle('Queue Ended')
         .setDescription(`The Queue is ended.`)
         .setColor("ORANGE")
         
         return queue.metadata.channel.send({ embeds: [QueueEnded] })
    } 
}