module.exports = {
    name: 'trackStart',
    execute (queue, track) {

        if (queue.repeatMode !== 0) return

        const { MessageEmbed } = require('discord.js')
        const nowPlaying = new MessageEmbed()
         .setTitle(`Now Playing 🎶`)
         .setDescription(`Now playing **${track.title}**`)
         .setColor("GREEN")

      return queue.metadata.channel.send({ embeds: [nowPlaying] })

    } 
}