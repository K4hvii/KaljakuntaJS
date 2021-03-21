const { Message } = require("discord.js");
const config = require('../../config.json');
const prefix = config.prefix

module.exports ={
    name : 'ban',
    description : 'Bans target member' + `${prefix}ban <member>`,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     * @returns 
     */
    run : async(client, message, args) => {
        if(!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send("I don't have permission to ban people!")
        if(!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("You don't have permission to do that!")
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify a member to ban');
        await Member.ban({ reasion : args.slice(1).join(" ")})
        message.channel.send(`${Member.user.tag} was banned from the server!`)
    }
}