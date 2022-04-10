const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageEmbed, MessageSelectMenu } = require('discord.js');


module.exports = {

    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Help about Mr Beat'),

    async execute(interaction){

        /**
         * Select menu.
         */
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
			)

        /**
        * Embed Message to reply.
        */
        const embed = new MessageEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setDescription('Some description here');

        await interaction.reply({ components: [row] });
    }

}

