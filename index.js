const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance.
global.client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MEMBERS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_VOICE_STATES,
	],
	disableMentions: 'everyone',
});

// Create a Collection to store commands.
global.client.commands = new Collection();

// Player Instance.
require('./src/plugins/discord-player');

// Load commands and event files.
require('./src/generators/files-loader');

// Deploy Slash commands.
require('./src/generators/deploy-commands');

// Login to Discord with client's token.
global.client.login(token);