const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('back')
		.setDescription('Plays the previous song.'),

	/**
     * Execute command action.
     *
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
	async execute(interaction) {

		// Defer the reply.
		await interaction.deferReply();

		// Get the queue.
		const queue = global.player.getQueue(interaction.guild.id);

		// Check if queue exists.
		if (!queue || !queue.playing) return interaction.editReply('There is not music currenly playing.');

		if (!queue.previousTracks[1]) {
			return await interaction.editReply('There is not previous track to play.')
				.then(() => wait(3000))
				.then(() => interaction.deleteReply());
		}
		// Plays the previous track.
		await queue.back();

		// Reply.
		await interaction.editReply(`Playing previous track: **${queue.previousTracks[1]}**`);

		// Wait and delete the reply.
		await wait(3000);
		await interaction.deleteReply();
	},
};