const { Client, Message, MessageEmbed } = require('discord.js');
const { type } = require('os');
const { inspect } = require('util')

module.exports = {
    name: 'eval',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run : async(client, message, args) => {
        if(message.author.id !== '453946836051558420') return;

        const code = args.join(" ");
        if(!code) return message.reply('Please provide some code to evaluate');

        try {
            const result = await eval(code);
            let output = result;
            if(typeof result !== 'string') {
                output = inspect(result)
            }

            message.channel.send(output, { code : 'js'})
        } catch (error) {
            message.channel.send('Evaluated content is too long to display')
        }
    }
}