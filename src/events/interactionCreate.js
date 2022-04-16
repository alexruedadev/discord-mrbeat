const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'interactionCreate',

	async execute(interaction) {

		// If Interaction is Command.
        if (interaction.isCommand()){

			const command = interaction.client.commands.get(interaction.commandName);

			if (!command) return;

			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);
				await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}

		}

		// If Interaction is a Select from menu.
		else if(interaction.isSelectMenu()){

			 if (interaction.customId === 'select') {

				const option = interaction.values[0];

				if(option == "commands"){

					const commands = interaction.client.commands;

					const embed = new MessageEmbed()

						embed.addField(`Commands \n`, commands.map(command => `\`${command.data.name}\` | ${command.data.description}`).join('\n'));

					await interaction.update({ embeds: [embed]});
				}
			}
		}

		// If interaction is Button.
		else if(interaction.isButton()){

			const filter = i => i.customId === 'nextsongs'

			const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });

			collector.on('collect', async i => {
				if (i.customId === 'nextsongs') {
					await i.deferUpdate();
					await wait(1000);
					await i.editReply({ content: 'A button was clicked!', components: [] });
				}
			});

		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};