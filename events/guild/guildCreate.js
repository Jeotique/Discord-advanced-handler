const {Bot} = require('../../structures/client')
const Discord = require('discord.js')
const checkDB = require('../../structures/checkForData')

module.exports = {
    name: 'guildCreate',

    /**
     * @param {Bot} client
     * @param {Discord.Guild} guild
     */
    run: async(client, guild)=>{
        if(!guild.available) return
        checkDB(client, guild)
    }
};