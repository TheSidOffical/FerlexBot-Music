const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('skip')
    .setDescription('Skips music.'),
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

    const IsSkipped = queue.skip();

    const SkippedSuccess = new MessageEmbed()
     .setTitle("Skipped Succsessfully")
     .setDescription(`The Music is Succsessfully skipped.`)
     .setColor("GREEN")
     .setFooter(interaction.client.config.options.embedFooter)

    const SkippedFailed = new MessageEmbed()
     .setTitle("Skip Failed")
     .setDescription(`The Music Failed to skip. \nCheck the Console!`)
     .setColor("RED")
     .setFooter(interaction.client.config.options.embedFooter)

     const status = IsSkipped ? SkippedSuccess : SkippedFailed

     return interaction.reply({ embeds: [status] })

  }
}