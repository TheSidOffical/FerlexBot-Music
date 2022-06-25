const fs = require('fs')
const path = require('path')
const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')
const client = global.client

const commands = []
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

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
  commands.push(command.data.toJSON())
}

const rest = new REST({ version: '9' }).setToken(client.config.application.token);

(async () => {
  try {
    await rest.put(
      Routes.applicationCommands(client.config.application.appId, null),
      { body: commands }
    )

    console.log('Successfully registered application commands.')
  } catch (error) {
    console.error(error)
  }
})()