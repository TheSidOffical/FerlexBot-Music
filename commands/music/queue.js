const { SlashCommandBuilder } = require('@discordjs/builders');
const { Queue } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('queue')
    .setDescription('Queue of Guild.'),
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

    const QueueEmbed = new MessageEmbed()
    .setTitle(`Queue of ${interaction.guild.name}`)
    .setTimestamp()
    .setFooter(interaction.client.config.options.embedFooter)
    .setColor("GREEN")

    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - \`${track.title}\` by \`${track.author}\` requested by: ${track.requestedBy})`);

    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s).` : `There is **${songs}** Song(s) in Playlist.`;

    QueueEmbed.setDescription(`**Current playing** \`${queue.current.title}\`\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`);

     return interaction.reply({ embeds: [QueueEmbed] })

  }
}