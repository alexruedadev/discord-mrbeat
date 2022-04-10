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
         * Instances
         */
        const queue = global.player.getQueue(interaction.guild.id);

        /**
         * If there is not music currently playing.
         */
        if (!queue || !queue.playing) return;

        /**
         * Delete the queue.
         */
        queue.destroy();

         /**
         * Embed Message to reply.
         */
        const embed = new MessageEmbed()
            .setColor('RED')
            .setTitle('⏹ Music has been stopped')
            .setDescription('See you later! 🙋‍♂️')
          // .setDescription(queue.previousTracks[0].title)
          // .setThumbnail(queue.previousTracks[0].thumbnail)

        /**
         * Reply.
         */
         await interaction.editReply({ embeds: [embed] });

    }

}