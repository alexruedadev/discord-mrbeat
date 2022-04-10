const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    /**
     * Command Propieties
     */
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the song you want')
    .addStringOption(option => 
        option.setName('song')
            .setDescription('Say the song you want to play')
            .setRequired(true)),

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
