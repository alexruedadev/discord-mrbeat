const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { QueryType } = require('discord-player');

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays the song you want')
		.addStringOption(option =>
			option.setName('music')
				.setDescription('Put the song name or Playlist link from Spotify or YouTube')
				.setRequired(true)),

	/**
     * Execute command action.
     *
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
	async execute(interaction) {

		// Defer the reply (Send reply with 'Bot is thinking...')
		await interaction.deferReply();
		await wait(1000);

		// Util Data.
		const guildId = interaction.guildId;
		// const channelId = interaction.channelId;

		// String Query.
		const song = interaction.options.getString('music');

		// Fetch the song.
		const query = await global.player.search(song, {
			requestedBy: interaction.user,
			searchEngine: QueryType.AUTO,
		});

		// Create a Queue.
		const queue = await global.player.createQueue(interaction.guildId, {
			metadata: interaction.channelId,
			interaction: interaction,
		});

		// Connect to voice channel. If user is not connected to anyone, send a reply.
		try {
			if (!queue.connection) await queue.connect(interaction.member.voice.channel);
		}
		catch {
			await global.player.deleteQueue(guildId);
			return interaction.editReply({
				content: `Hey \`@${interaction.user.username}\`, you must join a voice channel to play music! :3`,
				ephemeral: true,
			});
		}

		// Check if result is playlist or song and add it to queue.
		query.playlist ? queue.addTracks(query.tracks) : queue.addTrack(query.tracks[0]);

		// Play the queue.
		if (!queue.playing) await queue.play();

		// Send reply to text channel.
		// await interaction.deleteReply();
	},
};
