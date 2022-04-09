const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Search the song you want'),
    

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