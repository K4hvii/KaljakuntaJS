const { Message, Client } = require("discord.js");
const config = require('../../config.json')
const prefix = config.prefix

module.exports ={
    name : 'kick',
    description : 'Kicks target member' + `${prefix}kick <member>`,
    /**
     * @param {Client} client 
     * @param {Message} message 
     * @param {Sring[]} args
     * @returns
     */
    run : async(client, message, args) => {
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send("I don't have permission to kick people!")
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("You don't have permission to do that!")
        
        const Member = message.mentions.members.first()
        if(!Member) return message.channel.send('Please specify a member to kick');
        await Member.kick({ reasion : args.slice(1).join(" ")})
        message.channel.send(`${Member.user.tag} was kicked from the server!`)
    }
}