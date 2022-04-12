const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    // Slash Command Properties
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stops the music and leaves from channel.'),

    /**
     * Command Action.
     * 
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
    async execute(interaction){

        // Defer the reply (Send reply with 'Bot is thinking...').
        await interaction.deferReply();
        await wait(1000);

        // Get queue.
        const queue = global.player.getQueue(interaction.guild.id);

        // If there is not music currently playing.
        if (!queue || !queue.playing) return;

        // Delete the queue.
        queue.destroy();

        // Reply.
        await interaction.editReply({
            content: `Music has been stopped. See you later!`
        });
    }
}