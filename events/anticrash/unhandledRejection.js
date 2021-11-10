module.exports = {
    name: 'unhandledRejection',

    run: async(client, reason, p)=>{
        console.log(p)
        return console.log(`[ERROR CATCH] \nReason : ${reason}`)
    }
}