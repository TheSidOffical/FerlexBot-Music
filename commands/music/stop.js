const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops music.'),
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

    queue.destroy();

    const StopedSuccess = new MessageEmbed()
     .setTitle("Stoped Succsessfully")
     .setDescription(`The Music is Succsessfully stoped.`)
     .setColor("GREEN")
     .setFooter(interaction.client.config.options.embedFooter)


     return interaction.reply({ embeds: [StopedSuccess] })

  }
}