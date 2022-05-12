module.exports = {
	name: 'ready',
	once: true,
	execute(client) {

		/**
		 * Set Bot Status
		 *
		 * Activities: https://discord.js.org/#/docs/discord.js/stable/class/Activity
		 */
		client.user.setPresence({
			status: 'online',
			activities: [{
				name: 'Music',
				type: 'STREAMING',
				url: 'https://twitch.tv/alexdiple',
			}],
		});
	},
};