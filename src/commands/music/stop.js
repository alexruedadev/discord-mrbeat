const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    /**
     * Command Propieties
     */
    data: new SlashCommandBuilder()
        .setName('stop')
        .setDescription('Stop all the music activity.'),

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
            .setTitle('▶️ Stopped.')
            .setDescription("Song Name")
            // .setThumbnail("")

        /**
         * Reply.
         */
         await interaction.editReply({ embeds: [embed]});

    }

}