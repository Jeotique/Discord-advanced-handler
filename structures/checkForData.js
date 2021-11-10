const {Bot} = require('./client')
const Discord = require('discord.js')
/**
 * 
 * @param {Bot} client 
 * @param {Discord.Guild} guild 
 */
module.exports = async(client, guild)=>{
    let settings = await client.db.getAllWhere('settings', [{serverid: guild.id}])
    if(settings.length < 1){
        (await client.db.insert('settings', {serverid: guild.id, prefix: client.config.prefix})).save('settings', ['serverid', 'prefix'], [{serverid: guild.id}])
    }
    let channels = await client.db.getAllWhere('channels', [{serverid: guild.id}])
    if(channels.length < 1){
        (await client.db.insert('channels', {serverid: guild.id, startlogs: '-'})).save('channels', ['serverid', 'startlogs'], [{serverid: guild.id}])
    }
}
