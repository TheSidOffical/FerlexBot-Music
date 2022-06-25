const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const { QueryType } = require("discord-player");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music.')
    .addStringOption(option => 
      option.setName('name')
       .setDescription('Enter Name or an URL.')
       .setRequired(true)),
    async execute (interaction) {
        const player = interaction.client.player

        if (!interaction.member.voice.channelId) {
            const NoVoiceChannelFound = new MessageEmbed()
             .setTitle("Error :x:")
             .setDescription(`You are not in a Voice Channel!`)
             .setColor("RED")
             .setTimestamp()
            return await interaction.reply({ embeds: [NoVoiceChannelFound], ephemeral: true });
        } 

        if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId){
            const notMyVoiceChannel = new MessageEmbed()
             .setTitle("Error :x:")
             .setDescription(`You are not in my voice channel!`)
             .setColor("RED")
             .setTimestamp()
            return await interaction.reply({ embeds: [notMyVoiceChannel], ephemeral: true });
        }

        const query = interaction.options.getString('name') 
        const queue = player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            }
        });
        
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();

            const NoPermission = new MessageEmbed()
             .setTitle("Error :x:")
             .setDescription(`I Couldnt join your voice channel!`)
             .setColor("RED")
             .setTimestamp()
            return await interaction.reply({ embeds: [NoPermission], ephemeral: true });
        }

        await interaction.deferReply();
        const track = await player.search(query, {
            requestedBy: interaction.user,
            searchEngine: QueryType.AUTO
        }).then(x => x.tracks[0]);
        if (!track) {

            const NoTrackFounded = new MessageEmbed()
             .setTitle("Error :x:")
             .setDescription(`Track \`${query}\` not found!`)
             .setColor("RED")
             .setTimestamp()
            return await interaction.followUp({ embeds: [NoTrackFounded] });
        }

        queue.play(track);

        const Succsess = new MessageEmbed() 
         .setTitle("Loading Track ⏱️")
         .setDescription(`Loading Track \`${track.title}\``)
         .setColor("GREEN")
         .setFooter(interaction.client.config.options.embedFooter)

        return await interaction.followUp({ embeds: [Succsess] });
      
  }
}