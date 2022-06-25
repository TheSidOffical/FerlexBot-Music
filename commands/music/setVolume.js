const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('setvolume')
    .setDescription('Changes volume level.')
    .addNumberOption(option =>
         option 
               .setName("value")
               .setDescription("Enter a number.")
               .setRequired(true)
        ),
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

    const volumeLevel = interaction.options.getNumber("value")

    const invalidNumber = new MessageEmbed()
     .setTitle("Error :x:")
     .setDescription(`The number you enter must be between \`1\` and \`${interaction.client.config.options.maxVolume}\`.`)
     .setColor("RED")
     .setTimestamp()

    if(volumeLevel < 0 || volumeLevel > interaction.client.config.options.maxVolume) return interaction.reply({ embeds: [invalidNumber], ephemeral: true })

    queue.setVolume(volumeLevel);

    const succsess = new MessageEmbed()
     .setTitle(`Volume changed to %${volumeLevel}`)
     .setDescription(`Volume succsessfully changed to \`%${volumeLevel}\`.`)
     .setColor("GREEN")
     .setFooter(interaction.client.config.options.embedFooter)

     return interaction.reply({ embeds: [succsess]})

  }
}