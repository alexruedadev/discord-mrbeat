const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {

	// Slash Command Properties.
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Calculate the latency from server.'),

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

		// Reply.
		await interaction.editReply({
			embeds: [new MessageEmbed().setDescription(`Ping: **${global.client.ws.ping}ms**`)],
		});
	},
};