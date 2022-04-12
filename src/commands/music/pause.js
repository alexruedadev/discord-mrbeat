const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    // Slash Command Properties.
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the currently playing song.'),

    /**
     * Command Action.
     * 
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
    async execute(interaction){

        // Defer the reply (Send reply with 'Bot is thinking...')
        await interaction.deferReply()
        await wait(1000);

        // Get queue.
        const queue = player.getQueue(interaction.guild.id);

        // Check if queue exists.
        if (!queue) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription('There is not music currenly playing.')]
        });

        // Pause the queue.
        queue.setPaused(true);

        // Reply.
        await interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`**${queue.current.title}** paused.`)]
        });
    }
}