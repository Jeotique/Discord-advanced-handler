const {Bot} = require('../../structures/client')
const Discord = require('discord.js')
const checkDB = require('../../structures/checkForData')

module.exports = {
    name: 'ready',

    /**
     * @param {Bot} client
     */
    run: async(client)=>{
        if(client.guilds.cache.size < 1) return
        client.guilds.cache.map(async guild => {
            checkDB(client, guild)
        })
    }
};