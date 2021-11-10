const Discord = require('discord.js')
let getNow = () => { return { time: new Date().toLocaleString("en-EN", { timeZone: "Europe/Paris", hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) } }
module.exports = {
    name: 'ready',

    run: async (client) => {
        console.clear()
        const chalk = require('chalk')
        console.log(chalk.green.bold("Connected !"))
        console.log(chalk.gray("Logged into"), chalk.yellow(`${client.user.tag}`));
        console.log(
            chalk.white("Looking"),
            chalk.red(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`),
            chalk.white(`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0) > 1 ? "Members," : "Member,"}`),
            chalk.red(`${client.guilds.cache.size}`),
            chalk.white(`${client.guilds.cache.size > 1 ? "Servers." : "Server."}`)
        )
        console.log(
            chalk.white(`Prefix :` + chalk.red(` ${client.config.prefix}`)),
            chalk.white("||"),
            chalk.red(`${client.commands.size}`),
            chalk.white(`Commands`),
            chalk.white('||'),
            chalk.red(`${client.aliases.size}`),
            chalk.white('Aliases')
        );
        console.log("")
        console.log(chalk.red.bold("——————————[Statistics]——————————"))
        console.log(chalk.gray(`Working with ${process.version} on ${process.platform} ${process.arch}`))
        console.log(chalk.gray(`Memory : ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`))
        console.log(`${chalk.cyan(getNow().time)} - ${chalk.green("Restart")}`)
        client.guilds.cache.map(async guild => {
            await guild.members.fetch().catch(e => { })
        })
        await client.users.fetch().catch(e => { })
        client.user.setActivity(`${client.guilds.cache.size} servers || ${client.users.cache.size} members`, { type: 'STREAMING', url: "https://www.twitch.tv/Jeotique" })
        setInterval(async () => {
            client.user.setActivity(`${client.guilds.cache.size} servers || ${client.users.cache.size} members`, { type: 'STREAMING', url: "https://www.twitch.tv/Jeotique" })
        }, 120000)
    }
}