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
        await wait(1000);

        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return interaction.editReply({ embeds: [new MessageEmbed().setDescription('No hay música en reproducción')]});

        queue.setPaused(true);

        /**
         * Embed Message to reply.
         */
        const embed = new MessageEmbed()
        .setTitle('⏸️ Paused')
            .setColor('BLUE')
            .setDescription(`${queue.current.title}`)
            .setThumbnail(`${queue.current.thumbnail}`)

        /**
         * Reply.
         */
        await interaction.editReply({embeds: [embed]})
    }
}