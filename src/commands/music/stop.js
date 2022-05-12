const { SlashCommandBuilder } = require('@discordjs/builders');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('Stops the music and leaves from channel.'),

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

		// If there is not music currently playing.
		if (!queue || !queue.playing) {
			await interaction.editReply({ content: 'There is not music currently playing', ephemeral: true })
				.then(() => wait(3000))
				.then(() => interaction.deleteReply());
		}
		else {
			// If there is music currently playing.
			await queue.destroy();
			await interaction.editReply('Music has been stopped. See you later!')
				.then(() => wait(2000))
				.then(() => interaction.deleteReply());
		}
	},
};