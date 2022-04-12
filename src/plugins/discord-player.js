const { Player } = require('discord-player');
const { MessageEmbed } = require('discord.js');

// Player Instance.
global.player = new Player(global.client);


// Event when a track starts.
global.player.on('trackStart', (queue, track) => {

    global.player.handler.getMessages();

    const channel = global.client.channels.cache.get(global.player.handler.getChannel());

    channel.messages.fetch({limit:1}).then(messages => messages.forEach(message => message.edit('Blop!')))

});

// Event when track is added to queue.
global.player.on('trackAdd', (queue, track) => {
    
});

// Event when track has ended.
global.player.on('trackEnd', (queue, track) => {
    
});

// Event when queue has ended.
global.player.on('queueEnd', (queue, track) => {
    
});

// Event when bot disconnect from channel.
global.player.on('botDisconnect', (queue, track) => {
    
});

// Event when channel is empty.
global.player.on('channelEmpty', (queue, track) => {
    
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
