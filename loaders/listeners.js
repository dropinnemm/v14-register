const {red, green, blue,yellow} = require("chalk")
const {chalk} = require("chalk")
const { Client, GatewayIntentBits, ActivityType } = require('discord.js');
const config = require('../Config/settings');

module.exports = async (client) => {
    client.on('ready', () => {
        console.log(yellow(`${client.user.username} Botu başarıyla aktif edildi.`))
        setInterval(() => {
        const oynuyor = config.botdurum;
        const index = Math.floor(Math.random() * (oynuyor.length));
        client.user.setPresence({activities: [{ name: oynuyor[index], type: 5  }],status: 'dnd'})
        },5000)
    })
}
