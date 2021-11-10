/**
 * Template handler for github [Jeotique]
 */

const { Client, Intents, Collection } = require('discord.js')
const managers = require('mxtorie') //this module is created by Jeotique too, if you get any problem with contact me on my discord server discord.gg/mxtorie
const model = require('../database/model') //this is the model for the database, you can add or remove column in
const fs = require('fs')

class Bot extends Client {
    constructor(options = {
        fetchAllMembers: true,
        restTimeOffset: 1,
        intents: [Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING],
        partials: ['CHANNEL']
    }) {
        super(options);
        this.setMaxListeners(15)

        this.commands = new Collection()
        this.aliases = new Collection()
        this.slashCommands = new Collection()
        this.config = require('../../config')
        this.functions = require('../utils')
        this.initCommands()
        this.initEvents()
        this.initSlashCommands()
        this.db = new managers.database({
            host: this.config.database.host,
            user: this.config.database.user,
            pass: this.config.database.pass,
            database: this.config.database.database
        }, model)
        this.db.connectToDb().then(() => {
            setTimeout(() => {
                console.log('Connecting to the token...')
                this.login(this.config.token).catch(e => {
                    console.error("Fatal error : \nToken connection failed : " + e)
                })
            }, 3000) // THIS TIMEOUT IS IMPORTANT
        }).catch(e => console.log("Error during the connection to the database : " + e))
    }

    initCommands() {
        const subFolders = fs.readdirSync('./commands')
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./commands/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../commands/${category}/${commandFile}`)
                this.commands.set(command.name, command)
                if (command.aliases && command.aliases.length > 0) {
                    command.aliases.forEach(alias => this.aliases.set(alias, command))
                }
            }
        }
    }

    initEvents() {
        const subFolders = fs.readdirSync(`./events`)
        for (const category of subFolders) {
            const eventsFiles = fs.readdirSync(`./events/${category}`).filter(file => file.endsWith(".js"))
            for (const eventFile of eventsFiles) {
                const event = require(`../../events/${category}/${eventFile}`)
                this.on(event.name, (...args) => event.run(this, ...args))
                if (category === 'anticrash') process.on(event.name, (...args) => event.run(this, ...args))
            }
        }
    }

    initSlashCommands() {
        const subFolders = fs.readdirSync('./slashCmds')
        for (const category of subFolders) {
            const commandsFiles = fs.readdirSync(`./slashCmds/${category}`).filter(file => file.endsWith('.js'))
            for (const commandFile of commandsFiles) {
                const command = require(`../../slashCmds/${category}/${commandFile}`)
                this.slashCommands.set(command.name, command)
            }
        }
    }
}

exports.Bot = Bot