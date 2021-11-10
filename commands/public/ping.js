const {Bot} = require('../../structures/client')
const Discord = require('discord.js')

module.exports = {
    name: 'ping',
    aliases: ['speed'],

    /**
     * 
     * @param {Bot} client 
     * @param {Discord.Message} message 
     * @param {*} args 
     * @param {string} commandName 
     */
    run: async(client, message, args, commandName)=>{
        try{
            const embed = new Discord.MessageEmbed()
            embed.setTitle('PING')
            embed.addField('BOT', `${client.ws.ping}ms`, true)
            embed.setColor('BLUE')
            message.channel.send({embeds: [embed]}).then(msg => {
                let api = msg.createdAt - message.createdAt
                embed.addField("API", `${api}ms`, true)
                return msg.edit({embeds: [embed]}).catch(e=>{})
            }).catch(e=>{})
        }catch(err){
            console.log(`[Error - ${commandName.toUpperCase()}] : ${err}`)
        }
    }
}