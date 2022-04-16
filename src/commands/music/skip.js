const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    // Slash Command Properties.
    data: new SlashCommandBuilder()
        .setName('skip')
        .setDescription('Plays the next song on the playlist.'),

    /**
     * Command Action.
     * 
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
    async execute(interaction){

        // Defer the reply (Send reply with 'Bot is thinking...')
        await interaction.deferReply()
        
        // Get queue.
        const queue = player.getQueue(interaction.guild.id);

        // Check if queue exists.
        if (!queue || !queue.playing) return interaction.editReply({content:`There is not music currently playing`, ephemeral: true});
 
        // Skip the current song.
        queue.skip();

        // Reply.
        await interaction.editReply({content:`${queue.current.title} has been skipped`, ephemeral: true});

        // Wait and Delete Reply.
        await wait(3000);
        await interaction.deleteReply();
    }
}