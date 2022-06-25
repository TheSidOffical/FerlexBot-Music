const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('nowplaying')
    .setDescription('Shows curent playing music.'),
    async execute (interaction) {
        const player = interaction.client.player
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) { 
            const notThinkPlaying = new MessageEmbed()
             .setTitle("Error :x:")
             .setDescription(`No music currently playing.`)
             .setColor("RED")
             .setFooter(interaction.client.config.options.embedFooter)
            return interaction.reply({ embeds: [notThinkPlaying], ephemeral: true  });
    }
     
    const track = queue.current;

    const Nowplaying = new MessageEmbed()
     .setTitle("Now Playing - " + track.title)
     .setColor("GREEN")
     .setFooter(interaction.client.config.options.embedFooter)
     .addFields([
        {name: "Volume:", value: `**%${queue.volume}**`, inline: true},
        {name: "Duration:", value: `**${track.duration}**`, inline: true},
        {name: "Loop mode:", value: `**${queue.repeatMode ? "Enabled" : "Disabled" }**`, inline: true},
        {name: "Requested by:", value: `${track.requestedBy}`, inline: true},
     ])
     //.setDescription(`Volume **${queue.volume}**%\nDuration **${track.duration}**\nLoop mode **${queue.repeatMode ? "Enabled" : "Disabled" }**\nRequested by ${track.requestedBy}`)
     .setTimestamp()
       
     return interaction.reply({ embeds: [Nowplaying] })

  }
}