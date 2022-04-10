const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    /**
     * Command Propieties
     */
    data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pause the currently playing song.'),


    /**
     * Command Action to execute.
     * 
     * @param {*} interaction 
     */
    async execute(interaction){

        /**
         * Set 'Bot is thinking...'
         */
        await interaction.deferReply()
        await wait(2000);

        /**
         * Embed Message to reply.
         */
        const embed = new MessageEmbed()
            .setTitle('▶️ Playing...')
            .setDescription("Song Name")
            // .setThumbnail("")

        /**
         * Reply.
         */
        await interaction.editReply({ embeds: [embed]})
    }
}