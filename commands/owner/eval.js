const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js');
const db = require("quick.db")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('eval')
    .setDescription('Eval')
    .addStringOption(option => 
      option.setName('code')
       .setDescription('eval code')
       .setRequired(true)),
    async execute (interaction) {
      
    if(interaction.user.id !== "690960196968775721") return interaction.reply(':no_entry:');
    try {

      let code = interaction.options.getString('code')
      let evaled = eval(code)
      let tip = typeof(evaled)
    
      evaled = require('util').inspect(evaled)
    
      interaction.reply({
        ephemeral: true,
        embeds: [
          new MessageEmbed()
          .setColor("GREEN")
          .addField('INPUT', `\`\`\`js\n${code}\`\`\``)
          .addField('OUTPUT', `\`\`\`js\n${evaled.length > 1000 ? `${evaled.slice(0, 1000)}...` : `${clean(evaled)}` }\`\`\``)
          .addField('Length', `\`${evaled.length}\``, true)
          .addField('Delay', `\`0.0${interaction.client.ws.ping} MS\``, true),
        ],
      });
  
    } catch (err) {
  
      interaction.reply({
        ephemeral: true,
        embeds: [
          new MessageEmbed()
          .setColor("RED")
          .addField('ERROR', `\`\`\`js\n${clean(err).length > 1000 ? `${clean(err).slice(0, 1000)}...` : `${clean(err)}`}\n\`\`\``),
        ],
      });
    };
  
    function clean(text) {
  
      if (typeof(text) == 'string') return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203))
      else
      return text
    };
  }
}