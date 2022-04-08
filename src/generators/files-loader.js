const fs = require('node:fs');

/**
 * Command Directories.
 * 
 * @returns an array of all the directory categories in commands directory.
 */

const commandDirs = fs.readdirSync('./src/commands/');

 /**
  * Set Commands to client object.
  */
 
for(const dir of commandDirs){

    const commandFiles = fs.readdirSync(`./src/commands/${dir}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`../commands/${dir}/${file}`);
        // Set a new item in the Collection
        // With the key as the command name and the value as the exported module
        global.client.commands.set(command.data.name, command);
    }
};
 
/**
 * Event Files
 * 
 * @returns an array of all the file names in the given directory and filters for only '.js' files.
 */
 
const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));
 
/**
 * Set Events to client object.
 */
 
for (const file of eventFiles) {
    const event = require(`../events/${file}`);
    if (event.once) {
        global.client.once(event.name, (...args) => event.execute(...args));
    } else {
        global.client.on(event.name, (...args) => event.execute(...args));
    }
}