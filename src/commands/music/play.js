const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { QueryType } = require('discord-player');
const { MessageEmbed } = require('discord.js');

module.exports = {

    /**
     * Command Propieties
     */
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the song you want')
    .addStringOption(option => 
        option.setName('song')
            .setDescription('Say the song you want to play')
            .setRequired(true)),

    /**
     * Command Action to execute.
     * 
     * @param {*} interaction 
     */
    async execute(interaction){
        // console.log(interaction)
        /**
         * Set 'Bot is thinking...'
         */
        await interaction.deferReply()
        await wait(2000);

        /**
         * Util Constants.
         */

         const guildId = interaction.guildId;
         const channelId = interaction.channelId;
 
         /**
          * Command arguments.
          */
 
         const song = interaction.options.getString('song');
 
         /**
          * Fetch the song.
          * 
          * Busca la canción utilizando el método 'search' de discord-player.
          * 
          * El método 'search' admite más opciones en el segundo parámetro.
          * Search Method Doc: https://discord-player.js.org/docs/main/master/class/Player?scrollTo=search
          * 
          * @returns Promise<PlayerSearchResult>
          */
 
         const res = await global.player.search(song, {
             requestedBy: interaction.user,
             searchEngine: QueryType.AUTO
         });
 
         /**
          * Create a Queue.
          * 
          * Creates a queue for a guild if not available, else returns existing queue
          * 
          * https://discord-player.js.org/docs/main/master/class/Player?scrollTo=createQueue
          */
 
         const queue = await global.player.createQueue(guildId, {
             metadata: channelId
         });

         /**
          * Connect to Voice channel.
          */
         try {
             if (!queue.connection) await queue.connect("959924006033690658");
         } catch {
             await global.player.deleteQueue(guildId);
             return interaction.reply('No se puede acceder al canal de voz.');
         }
 
        /**
         * Play the song.
         */ 
        res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);
        if (!queue.playing) await queue.play();

        /**
         * Embed Message to reply.
         */
        const embed = new MessageEmbed()
            .setColor('GREEN')
            .setTitle('▶️ Playing...')
            .setDescription(queue.current.title)
            .setThumbnail(queue.current.thumbnail)
            .setFooter(`[${queue.current.duration}]`)

        /**
         * Reply.
         */
        await interaction.editReply({ embeds: [embed]})
    }
}
