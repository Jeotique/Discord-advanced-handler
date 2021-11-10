module.exports = {
    name: 'interactionCreate',

    run: async(client, interaction)=>{
        try{
            if(interaction.isContextMenu()){
                const command = client.slashCommands.get(interaction.commandName)
                if(!command) return
                command.run(client, interaction, command.name)
            }
        }catch(err){
            console.log('forContextMenu error : '+err)
        }
    }
}