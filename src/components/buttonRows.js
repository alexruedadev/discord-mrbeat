const {MessageButton, MessageActionRow } = require('discord.js');
const {b, bnn, c, d, i, inv, m, p, pr, r, s, v, vo, lofi, su, dot, dev, lang} = require("../assets/emojis.json");

const btn_play = new MessageButton()
    .setLabel(' ') // Text label in button.
    .setEmoji(' ') // Emoji for button.
    .setCustomId(' ') // Unique String to send in interaction.
    .setStyle(' ') // 
    // .setDisabled() // Disable the button.
    // setURL() // Set a URL. 

const btn_pause = new MessageButton()
    // .setLabel('')
    .setEmoji(pau)
    .setCustomId('pause')
    .setStyle('SECONDARY')


/**
 * Action Rows
 */

//
const controller_row = new MessageActionRow()
    .addComponents(

        new MessageButton()
            .setLabel('<')
            .setEmoji('937063426121936907')
            .setCustomId('back')
            .setStyle('grey'),

        new MessageButton()
            .setLabel('Pause')
            .setEmoji('937063426121936907')
            .setCustomId('pause')
            .setStyle('grey'),

        new MessageButton()
            .setLabel('>')
            .setEmoji('937063426121936907')
            .setCustomId('next')
            .setStyle('grey'),

    );


module.exports = {
    btn_play,
    btn_pause
}