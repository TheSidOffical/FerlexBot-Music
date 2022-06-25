const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { QueueRepeatMode } = require("discord-player")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('loopmode')
    .setDescription('Enables/Disables loop mode.')
    .addStringOption(option => 
        option
              .setName("enable-or-disable")
              .setDescription('Select Queue Loop mode or Current Music Loop mode.')
              .setRequired(true)
              .addChoices(
				{ name: 'Queue', value: 'queue' },
				{ name: 'Current Music', value: 'current_music' },
			 )
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

    const choice = interaction.options.getString("enable-or-disable")

    if(choice === "queue") {

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.QUEUE : QueueRepeatMode.OFF); 
        const status = queue.repeatMode === 0 ? 'disabled' : 'enabled'

        const successEmbed = new MessageEmbed()
         .setTitle(`Loop mode ${status}.`)
         .setDescription(`Loop mode successfully \`${status}\` for Queue. `)
         .setColor("GREEN")
         .setFooter(interaction.client.config.options.embedFooter)

        
         return interaction.reply({ embeds: [successEmbed]})


    } else if(choice === "current_music") {

        const success = queue.setRepeatMode(queue.repeatMode === 0 ? QueueRepeatMode.TRACK : QueueRepeatMode.OFF);
        const status = queue.repeatMode === 0 ? 'disabled' : 'enabled'

        const successEmbed = new MessageEmbed()
         .setTitle(`Loop mode ${status}.`)
         .setDescription(`Loop mode successfully \`${status}\` for Curent Music. `)
         .setColor("GREEN")
         .setFooter(interaction.client.config.options.embedFooter)
        
         return interaction.reply({ embeds: [successEmbed]})

    } else {

        const error = new MessageEmbed()
         .setTitle("Error :x:")
         .setDescription("Invalid selection.")
         .setColor("RED")
         .setFooter(interaction.client.config.options.embedFooter)
            
         return interaction.reply({ embeds: [error], ephemeral: true });
          
    }

    

  }
}