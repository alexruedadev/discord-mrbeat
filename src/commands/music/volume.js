const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const maxVol = 100;

module.exports = {

    // Slash Command Properties.
    data: new SlashCommandBuilder()
        .setName('volume')
        .setDescription('Turn up/down volume for all users.')
        .addStringOption(option => 
            option.setName('number')
                .setDescription(`value between 0 / ${maxVol}`)
                .setRequired(true)),
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

        // Get queue.
        const queue = global.player.getQueue(interaction.guild.id);

        // Check if queue exists.
        if (!queue || !queue.playing) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription('There is not music currenly playing.')]
        });

        // Get new Volume.
        const vol = parseInt(interaction.options.getString('number'));
 
        // Check if new volume is a number.
        if (!vol) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`*To change the volume enter a valid number between **1** and **${maxVol}**.*`)]
        });
 
        // Check if new volume is equals to current one.
        if (queue.volume === vol) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`The volume you want to change is already the current one.`)]
        });
 
        // Check if volume number is valid.
        if (vol < 0 || vol > maxVol) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`This volume is not valid. Enter a number between **1** and **${maxVol}**`)]
        });
 
        // Set new Volume.
        queue.setVolume(vol);
        
        // Reply.
        await interaction.editReply({
            embeds: [new MessageEmbed().setDescription(`Volume has changed to **${vol}**% 🔊`)]
        });
    }
}