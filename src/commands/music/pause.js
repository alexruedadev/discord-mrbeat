const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
const pausedGif = 'https://s7.gifyu.com/images/paused.png';
const youtubeIcon = 'https://cdn.icon-icons.com/icons2/1907/PNG/512/iconfinder-youtube-4555888_121363.png';
const spotifyIcon = 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png';

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
        
        if(queue.current.playlist){
            
            queue.current.playlist.source == 'spotify' ? icon = spotifyIcon : icon = youtubeIcon;

            queue.current.url.match(/youtube.com/) ? source = 'YouTube Playlist' : source = 'Spotify Playlist';
    
            queue.options.interaction.editReply({ content: " ", embeds: [

                new MessageEmbed()
                .setAuthor({ name: 'Paused', iconURL: pausedGif})
                .setDescription(`[**${queue.current.title}** | ${queue.current.author}](${queue.current.url})`)
                .setThumbnail(queue.current.thumbnail)
                .setTitle(`${queue.current.playlist.title}`)
                .addFields({name: 'Duration', value: `\`${queue.current.duration}\``, inline: true})
                .setFooter({text: `${source} created by ${queue.current.author.name}`, iconURL: icon})
            ]})
        }
        // Reply and delete reply.
        await interaction.followUp({content:`${interaction.user.username} you have paused the music.`, ephemeral: true });
        await wait(3000);
        await interaction.deleteReply();
    }
}