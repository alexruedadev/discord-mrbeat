const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Help about Mr Beat'),

	/**
     * Execute command action.
     *
     * @param {*} interaction is the <CommandInteraction> object created from Command.
     * @returns ?
     */
	async execute(interaction) {

		// Select Menu
		const row = new MessageActionRow()
			.addComponents(
				new MessageSelectMenu()
					.setCustomId('select')
					.setPlaceholder('Select something')
					.addOptions([
						{
							label: 'Commands',
							description: 'This is a description',
							value: 'commands',
						},
						{
							label: 'Streaming',
							description: 'This is also a description',
							value: 'streaming',
						},
						{
							label: 'Utilities',
							description: 'This is also a description',
							value: 'utilities',
						},
						{
							label: 'Admin',
							description: 'This is also a description',
							value: 'admin',
						},
					]),
			);

		// Reply.
		await interaction.reply({ components: [row] });
	},
};

