const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    // Slash Command Properties.
    data: new SlashCommandBuilder()
        .setName('back')
        .setDescription('Plays the previous song.'),

    /**
     * Command Action.
     * 
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
    async execute(interaction){

        // Defer the reply. (Send reply with 'Bot is thinking...')
        await interaction.deferReply();
        await wait(1000);

        // Get the queue.
        const queue = player.getQueue(interaction.guild.id);

        // Check if queue exists.
        if (!queue || !queue.playing) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription('There is not music currenly playing.')]
        });

        // Check if previous tracks exists.
        if (!queue.previousTracks[1]) return interaction.editReply({ 
            embeds: [new MessageEmbed().setDescription(`There is not previous track to play.`)]
        });

        // Plays the previous track.
        await queue.back();

        // Reply.
        await interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`Playing back **${queue.previousTracks[1]}**`)]
        });
    }
}