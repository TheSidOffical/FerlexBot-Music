const fs = require('fs')
const path = require('path')
const { Client, Collection, MessageEmbed } = require('discord.js')
const { appId, guildId, token, mongourl } = require('./config.json')
const client = new Client({ intents: 32639 })
const { Database } = require('quickmongo')
const db = global.db = new Database(mongourl);

db.on("ready", () => { console.log("[DATABASE-HANDLER] Connected to the database") });

require("./command-loader.js")
client.commands = new Collection()
const commandFiles = []

const getFilesRecursively = (directory) => {
  const filesInDirectory = fs.readdirSync(directory)
  for (const file of filesInDirectory) {
    const absolute = path.join(directory, file)
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute)
    } else {
      commandFiles.push(absolute)
    }
  }
}
getFilesRecursively('./commands/')

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

process.on('uncaughtException', err => {
	console.error(err)
  })

// Login
client.login(token)