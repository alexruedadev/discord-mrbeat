const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;
const { playlistEmbed, simpleTrackEmbed } = require('../../components/embed-player');

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('replay')
		.setDescription('Replays the current paused song'),

	/**
     * Execute command action.
     *
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
	async execute(interaction) {

		// Defer the reply.
		await interaction.deferReply();

		// Get queue.
		const queue = global.player.getQueue(interaction.guild.id);

		// Check if queue exists.
		if (!queue) return await interaction.editReply('There is not music currenly playing.');

		// Get track.
		const track = queue.current;

		// Pause the queue.
		queue.setPaused(false);

		// Reply.
		await interaction.editReply(`Replaying **${queue.current.title}**`);

		// Edit Visual Player
		track.playlist ? playlistEmbed(queue, track) : simpleTrackEmbed(queue, track);

		// Wait and delete reply.
		await wait(3000);
		await interaction.deleteReply();
	},
};