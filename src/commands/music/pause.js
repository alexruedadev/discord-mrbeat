const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

    // Slash Command Properties.
    data: new SlashCommandBuilder()
        .setName('pause')
        .setDescription('Pauses the currently playing song.'),

    /**
     * Command Action.
     * 
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
    async execute(interaction){

        // Defer the reply (Send reply with 'Bot is thinking...')
        await interaction.deferReply()

        // Get queue.
        const queue = player.getQueue(interaction.guild.id);

        // Check if queue exists.
        if (!queue) return interaction.editReply({
            embeds: [new MessageEmbed().setDescription('There is not music currenly playing.')]
        });

        // Pause the queue.
        queue.setPaused(true);

        // Update the Visual Player
        queue.options.interaction.editReply({ content: " ", embeds: [
            new MessageEmbed()
                .setAuthor({ name: 'YouTube Track', iconURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png', url: queue.current.url })
                .setDescription(`\`▶️ Paused \`\n\n **${queue.current.title}** | ${queue.current.author}`)
                .setThumbnail(queue.current.thumbnail)
        ]});

        // Reply and delete reply.
        await interaction.followUp({content:`${interaction.user.username} you have paused the music.`, ephemeral: true });
        await wait(3000);
        await interaction.deleteReply();
    }
}