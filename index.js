// Require the necessary discord.js classes
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
global.client = new Client({ intents: [Intents.FLAGS.GUILDS] });


/**
 * Create a Collection to store App commands.
 */

global.client.commands = new Collection();

/**
 * Load Commands and Events.
 */

require('./src/generators/loader');

/**
 * Deploy Slash Commands (Integrateds).
 */

require('./src/generators/deploy-commands');

// Login to Discord with your client's token
global.client.login(token);