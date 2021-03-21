const config = require('../../config.json')
const prefix = config.prefix

module.exports = {
    name : 'clear',
    aliases : ['purge'],
    usage : '<amount>',
    description : 'Deletes 1-99 messages that are younger than 14days old',
    run : async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send("You don't have permission to do that!")
        if(!message.guild.me.hasPermission('MANAGE_MESSAGES')) return message.channel.send("I don't have permission to do that!")
        if(!args[0]) return message.channel.send('Please specify an amount to delete (1-99)')
        if(isNaN(args[0])) return message.channel.send('Only numbers are allowed')
        if(parseInt(args[0]) > 99) return message.channel.send('The max amount of messages you can delete is 99')

            await message.channel.bulkDelete(parseInt(args[0]) + 1)
                .catch(err => console.log(err))
            message.channel.send(`Deleted ${args[0]} messages!`).then(m => m.delete({ timeout : 5000 }))
    }
}