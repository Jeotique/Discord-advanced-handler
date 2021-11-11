const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'startlogs',
    aliases: ['startlog'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
            if(!message.member.permissions.has('MANAGE_GUILD') && !client.config.owners.includes(message.author.id)) return message.reply(`:x: You don't have the permission to use this command.`).catch(e=>{})
            let mention = message.mentions.channels.first()?.id || message.guild.channels.cache.filter(c=>c.type!=='GUILD_VOICE').get(args[0])?.id || message.channelId
            if(!mention) return message.reply("You didn't gave me any valid channel.").catch(e=>{})
            let currentchannel = await client.db.getOne('channels', [{serverid: message.guildId}], 'startlogs') || client.config.prefix
            if(mention===currentchannel) return message.channel.send(`The channel is exacly the same of the current one.`).catch(e=>{})
            client.db.set('channels', [{serverid: message.guildId}], 'startlogs', mention)
            await message.channel.send(`The new start logs channel is <#${mention}>`).catch(e=>{})
            client.db.save('channels', ['startlogs'], [{serverid: message.guildId}]).catch(e=>{
                console.log(`Error during the save of the startlogs in the database : ${e}`)
            })
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}
