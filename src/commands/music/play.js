const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the song you want')
    .addStringOption(option => 
        option.setName('song')
            .setDescription('Say the song you want to play')
            .setRequired(true)),

    async execute(interaction){

        /**
         * Embed Message
         */
        const embed = new MessageEmbed()
            .setTitle('▶️ Playing...')
            .setDescription("Song Name")
            // .setThumbnail("")

        /**
         * Reply
         */
        interaction.reply({ embeds: [embed]})
    }
}
