const { Player } = require('discord-player');
const { MessageEmbed } = require('discord.js');
const { playlistEmbed, simpleTrackEmbed } = require('../components/embed-player');

// Player Instance.
global.player = new Player(global.client);

// Event when a track starts.
global.player.on('trackStart', (queue, track) => {

    // If track is from playlist.
    if(track.playlist) return playlistEmbed(queue, track);

    // If track is not from playlist.
    if(!track.playlist) return simpleTrackEmbed(queue, track);
});

// Event when track is added to queue.
global.player.on('trackAdd', (queue, track) => {


});

// Event when track has ended.
global.player.on('trackEnd', (queue, track) => {

});

// Event when queue has ended.
global.player.on('queueEnd', (queue, track) => {

    // Delete Visual Player.
    queue.options.interaction.deleteReply();
});

// Event when bot disconnect from channel.
global.player.on('botDisconnect', (queue, track) => {

    // Delete Visual Player.
    queue.options.interaction.deleteReply();
    console.log('DISCONNECTED FROM CHANNEL')
});

// Event when channel is empty.
global.player.on('channelEmpty', (queue, track) => {
    
    // Delete Visual Player.
    queue.options.interaction.deleteReply();
    console.log('El canal esta vacio!')
});

// Event when connect to voice channel.
global.player.on('connectionCreate', (queue, track) => {
    
});

// Event when Bot has connection error.
global.player.on('connectionError', (queue, track) => {
    
});

// Event when any error.
global.player.on('error', (queue, track) => {
    
});
