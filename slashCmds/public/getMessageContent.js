const Discord = require('discord.js')
const fs = require('fs')
module.exports = {
    name: 'Get message content',
    type: 'MESSAGE',

    run: async(client, interaction, commandName)=>{
        try{
            await interaction.deferReply({ephemeral: true}).catch(e=>{})
            const message = await interaction.channel.messages.fetch(interaction.targetId).catch(e=>{})

            if(!message) return interaction.followUp({content: "Error : can't get the message."}).catch(e=>{})
            return interaction.followUp({content: message.content?message.content:'\`no content\`'}).catch(e=>{})        

        }catch(err){
            console.log(`${commandName.toUpperCase()} [ERROR] : ${err}`)
        }
    }
}