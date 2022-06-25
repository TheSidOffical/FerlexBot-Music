const fs = require('fs')
const path = require('path')

const { Client, Collection, Intents, MessageEmbed } = require('discord.js')
const client = global.client = new Client({ intents: 131071 })
client.config = require('./config.js');

const { QuickDB } = require("quick.db");
const db = global.db = new QuickDB({ filePath: `database.sqlite` });

const { Player } = require("discord-player");
const player = client.player = new Player(client, client.config.options.PlayerSettings);

require("./command-loader.js")
client.commands = new Collection()
const commandFiles = []

const getFiles = (directory) => {
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)
    if (fs.statSync(absolute).isDirectory()) {
      getFiles(absolute)
    } else {
      commandFiles.push(absolute)
    }
  }
}

getFiles('./commands/')

for (const file of commandFiles) {
  const command = require(`./${file}`)
  client.commands.set(command.data.name, command)
}

// Add event files
const clientEventFiles = fs.readdirSync('./events/client').filter(file => file.endsWith('.js'))

for (const file of clientEventFiles) {
  const event = require(`./events/client/${file}`)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}
const playerEventFiles = fs.readdirSync('./events/player').filter(file => file.endsWith('.js'))

for (const file of playerEventFiles) {
  const event = require(`./events/player/${file}`)
    player.on(event.name, (...args) => event.execute(...args))
}

process.on('uncaughtException', err => {
	console.error(err)
  })


client.login(client.config.application.token)
