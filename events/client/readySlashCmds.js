module.exports = {
    name: 'ready',

    run: async(client)=>{
        try{
            await client.functions.sleep(3000)
            client.guilds.cache.forEach(async guild => {
                guild.commands.set(client.slashCommands).catch(e=>{})
            })
        }catch(err){
            console.log('readySlashCmds error : '+err)
        }
    }
}