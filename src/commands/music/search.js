const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    /**
     * Command Propieties
     */
    data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search the song you want')
    .addUserOption(option => option.setName('youtube').setDescription('Search on YouTube.'))
    .addUserOption(option => option.setName('spotify').setDescription('Search on Spotify.'))
    .addUserOption(option => option.setName('twitch').setDescription('Search on Twitch.')),
			
    
    /**
     * Command Action to execute.
     * 
     * @param {*} interaction 
     */
    async execute(interaction){

        await interaction.deferReply()
        /**
         * Embed Message
         */
        const embed = new MessageEmbed()
            .setTitle('Searched!')

        await wait(2000);
        /**
         * Reply
         */
        await interaction.editReply({ embeds: [embed]})
    }
}