const { Player } = require('discord-player');
const { playlistEmbed, simpleTrackEmbed } = require('../components/embed-player');

// Player Instance.
global.player = new Player(global.client);

// Event when a track starts.
global.player.on('trackStart', (queue, track) => {

	// If track is from playlist.
	track.playlist ? playlistEmbed(queue, track) : simpleTrackEmbed(queue, track);
});

// Event when track is added to queue.
global.player.on('trackAdd', (queue, track) => {
	// Code
});

// Event when track has ended.
global.player.on('trackEnd', (queue, track) => {
	// Code
});

// Event when queue has ended.
global.player.on('queueEnd', (queue, track) => {

	// Delete Visual Player.
	queue.options.interaction.deleteReply();
});

// Event when bot disconnect from channel.
global.player.on('botDisconnect', (queue, track) => {
	console.log('Disconnected from channel');
});

// Event when channel is empty.
global.player.on('channelEmpty', (queue, track) => {
	console.log('Channel is Empty! Disconnecting...');
});

// Event when connect to voice channel.
global.player.on('connectionCreate', (queue, track) => {
	// Code
});

// Event when Bot has connection error.
global.player.on('connectionError', (queue, track) => {
	// Code
});

// Event when any error.
global.player.on('error', (queue, track) => {
	// Code
});
