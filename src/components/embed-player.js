const { MessageEmbed } = require('discord.js');

let icon;
let source;
const youtubeIcon = 'https://cdn.icon-icons.com/icons2/1907/PNG/512/iconfinder-youtube-4555888_121363.png';
const spotifyIcon = 'https://cdn-icons-png.flaticon.com/512/2111/2111624.png';
const playerGif = 'https://s7.gifyu.com/images/7Lvu-1.gif';
// const pausedGif = 'https://s7.gifyu.com/images/paused.png';

function playlistEmbed(queue, track) {

	track.playlist.source == 'spotify' ? icon = spotifyIcon : icon = youtubeIcon;

	track.url.match(/youtube.com/) ? source = 'YouTube Playlist' : source = 'Spotify Playlist';

	return queue.options.interaction.editReply({ content: ' ', embeds: [

		new MessageEmbed()
			.setAuthor({ name: 'Playing...', iconURL: playerGif })
			.setDescription(`[**${track.title}** | ${track.author}](${track.url})`)
			.setThumbnail(track.thumbnail)
			.setTitle(`${track.playlist.title}`)
			.addFields({ name: 'Duration', value: `\`${track.duration}\``, inline: true })
			.setFooter({ text: `${source} created by`, iconURL: icon }),
	] });

}

function simpleTrackEmbed(queue, track) {

	if (track.url.match(/youtube.com/)) {
		icon = youtubeIcon;
		source = 'YouTube Track';
	}
	else {
		icon = spotifyIcon;
		source = 'Spotify Track';
	}

	return queue.options.interaction.editReply({ content: ' ', embeds: [

		new MessageEmbed()
			.setAuthor({ name: source, iconURL: icon })
			.setDescription(`[**${track.title}** | ${track.author}](${track.url})`)
			.setThumbnail(track.thumbnail)
			.addFields({ name: 'Duration', value: `\`${track.duration}\``, inline: true }),
		// .setFooter({text: `${track.playlist.source} Playlist`, iconURL: icon})
	] });
}

module.exports = {
	playlistEmbed,
	simpleTrackEmbed,
};

