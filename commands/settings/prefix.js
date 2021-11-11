const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'prefix',
    aliases: ['setprefix'],

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
            let newprefix = args[0]
            if(!newprefix) return message.channel.send("You didn't gave me any prefix.").catch(e=>{})
            let currentprefix = await client.db.getOne('settings', [{serverid: message.guildId}], 'prefix') || client.config.prefix
            if(newprefix===currentprefix) return message.channel.send(`The prefix is exacly the same of my current one.`).catch(e=>{})
            client.db.set('settings', [{serverid: message.guildId}], 'prefix', newprefix)
            await message.channel.send(`My new prefix is \`${newprefix}\``).catch(e=>{})
            client.db.save('settings', ['prefix'], [{serverid: message.guildId}]).catch(e=>{
                console.log(`Error during the save of the prefix in the database : ${e}`)
            })
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}
