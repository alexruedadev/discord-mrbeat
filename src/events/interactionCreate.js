const { MessageEmbed } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'interactionCreate',

	async execute(interaction) {

		/**
		 * If Interaction is Command.
		 */
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
		/**
		 * If Interaction is a Select from menu.
		 */
		else if(interaction.isSelectMenu()){

			/**
         	* Reply Controll.
         	*/
			 if (interaction.customId === 'select') {

				/**
			 	* Selected Option.
			 	*/
				const option = interaction.values[0];

				/**
				 * Option Controll.
				 */
				if(option == "commands"){

					const commands = interaction.client.commands;
					/**
				 	 * Embed response constructor.
				 	 */
					const embed = new MessageEmbed()

						embed.addField(`Commands \n`, commands.map(command => `\`${command.data.name}\` | ${command.data.description}`).join('\n'));

					await interaction.update({ embeds: [embed]});
				}
			}
		}
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
	},
};