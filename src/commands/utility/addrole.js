const { Message } = require('discord.js')
const config = require('../../config.json')
const prefix = config.prefix

module.exports = {
    name : 'addrole',
    description: 'Adds role for target member\n' + `${prefix}addrole <target> <role>`,
    run : async(client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission.")

        const target = message.mentions.members.first()
        if(!target) return message.channel.send('No member specified')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('No role specified')

        await target.roles.add(role)
        message.channel.send(`${target.user.username} has obtained role`)
    }
}