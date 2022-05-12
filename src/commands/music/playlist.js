const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('playlist')
		.setDescription('Shows the current playlist.'),

	/**
     * Execute command action.
     *
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
	async execute(interaction) {

		// Defer the reply.
		await interaction.deferReply();
		await wait(1000);

		// Get queue.
		const queue = global.player.getQueue(interaction.guild.id);

		// Check if queue exists.
		if (!queue) {
			return interaction.editReply({
				embeds: [new MessageEmbed().setDescription('There is not music currenly playing.')],
			});
		}

		// If playlist doesnt exists.
		if (!queue.current.playlist) return interaction.editReply({ content: 'There is not playlist to show.' });

		const tracks = queue.tracks.map((track, i) => `**${i + 1}** - **${track.title}** | ${track.author}\n`);
		const songs = queue.tracks.length;
		const nextSongs = songs > 5 ? `... and other **${songs - 5}** tracks.` : `**${songs}** tracks in the playlist.`;

		const row = new MessageActionRow()
			.addComponents(

				new MessageButton()
					.setCustomId('nextsongs')
					.setLabel('Next Songs')
					.setStyle('PRIMARY'),

				new MessageButton()
					.setLabel('View on Spotify')
					.setStyle('LINK')
					.setURL('https://spotify.com'),
			);

		// If playlist comes from Spotify
		if (queue.current.playlist.source == 'spotify') {

			const embed = new MessageEmbed()
				.setAuthor('Spotify Playlist', 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png')
				.setTitle(`${queue.current.playlist.title}\n\n`)
				.setDescription(`\`▶️ Now Playing - ${queue.current.title} | ${queue.current.author}\``)
				.setThumbnail(queue.current.playlist.thumbnail)
				.setFooter(`Playlist created by ${queue.current.playlist.author.name}`);

			// Reply.
			await interaction.editReply({ embeds: [embed], components: [row] });
		}

		// If playlist comes from YouTube
		if (queue.current.playlist.source == 'youtube') {

			const embed = new MessageEmbed()
				.setAuthor('YouTube Playlist', 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png')
				.setTitle(`${queue.current.playlist.title}\n\n`)
				.setDescription(`\`▶️ Now Playing - ${queue.current.title} | ${queue.current.author}\``)
				.setThumbnail(queue.current.playlist.thumbnail)
				.setFooter(`Playlist created by ${queue.current.playlist.author.name}`);

			// Reply.
			await interaction.editReply({ embeds: [embed] });
		}
	},
};