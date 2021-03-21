const { Message } = require('discord.js')
const config = require('../../config.json')
const prefix = config.prefix

module.exports = {
    name : 'removerole',
    description: 'Removes a role from target member\n' + `${prefix}removerole <target> <role>`,
    run : async(client, message, args) => {

        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("You don't have permission.")

        const target = message.mentions.members.first()
        if(!target) return message.channel.send('No member specified')
        const role = message.mentions.roles.first()
        if(!role) return message.channel.send('No role specified')

        await target.roles.remove(role)
        message.channel.send(`${target.user.username}'s role removed`)
    }
}