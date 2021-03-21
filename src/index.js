const {Collection, Client, Discord, MessageEmbed} = require('discord.js')
const fs = require('fs')
const client = new Client({
    disableEveryone: true,
});
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Werinia:werinia@kaljabotti.amorj.mongodb.net/KaljaBotti?retryWrites=true&w=majority', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected to mongodb'))



const config = require('./config.json')
const prefix = config.prefix
const token = config.token
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 
client.on('ready', () => {
    client.user.setActivity(`${prefix}help`)
    console.log(`${client.user.username} ✅`)
})
client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) command.run(client, message, args) 
})

var welcomeChannel = '765218850530000916'

client.on('guildMemberAdd', async(member) => {
    const Channel = member.guild.channels.cache.get(welcomeChannel)

    const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('New Member')
        .setDescription(`**${member.displayName}** welcome to ${member.guild.name}, we now have ${member.guild.memberCount} members.`)

    Channel.send(embed)
})

client.on('guildMemberRemove', async(member) => {
    const Channel = member.guild.channels.cache.get(welcomeChannel)

    const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle('Member has left the server ;(')
        .setDescription(`**${member.displayName}** has left ${member.guild.name}, we now have ${member.guild.memberCount} members.`)

    Channel.send(embed)
})

client.login(token)