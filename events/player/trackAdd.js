module.exports = {
    name: 'trackAdd',
    execute (queue, track) {

        const { MessageEmbed } = require('discord.js')
        const Added = new MessageEmbed()
         .setTitle(`${track.title} Added into Queue`)
         .setDescription(`\`${track.title}\` Added into Queue.`)
         .setColor("GREEN")

      return queue.metadata.channel.send({ embeds: [Added] })

    } 
}