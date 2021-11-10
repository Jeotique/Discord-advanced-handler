const {Bot} = require('../../structures/client')
const Discord = require('discord.js');

module.exports = {
    name: 'ready',

    /**
     * @param {Bot} client
     */
    run: async(client)=>{
        if(client.guilds.cache.size < 1) return
        client.guilds.cache.map(async guild => {
            let logsid = await client.db.get('channels', [{serverid: guild.id}], 'startlogs')
            if(!logsid) return
            const channel = guild.channels.cache.get(logsid[0])
            if(!channel) return
            channel.send(`The bot is online.`).catch(e=>{})
        })
    }
};