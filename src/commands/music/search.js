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
    .addSubcommand(subcommand =>
		subcommand
			.setName('youtube')
			.setDescription('Search on Youtube')
			.addUserOption(option => option.setName('videoclip').setDescription('the youtube video')))
	.addSubcommand(subcommand =>
		subcommand
			.setName('spotify')
			.setDescription('Search on Spotify')),
    
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