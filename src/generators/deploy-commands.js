const fs = require('node:fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../../config.json');

/**
 * Commands Instance.
 */

const commands = [];
const commandDirs = fs.readdirSync('./src/commands/');

for(const dir of commandDirs){
	const commandFiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));

	for (const file of commandFiles) {
		const command = require(`../commands/${dir}/${file}`);
		commands.push(command.data.toJSON());
	}
}
const rest = new REST({ version: '9' }).setToken(token);

/**
 * Register commands
 * 
 * Running this script will register all your commands to the guild of which the id was passed in above.
 * 
 * IMPORTANT! -> Hay que cambiar la forma de almacenar los comandos. 
 * 
 * Los comandos de guild se utilizan para el desarrollo, para el uso público se recomiendan los globales.
 * -> https://discordjs.guide/interactions/slash-commands.html#global-commands
 */

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();