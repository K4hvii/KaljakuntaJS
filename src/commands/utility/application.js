const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name : "apply",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
    */

    run : async(client, message, args) => {
        const questions = [
            "How old am I?",
            "Where am I from?",
            "What's my gender?"
        ];

        let collectCounter = 0;
        let endCounter = 0;

        const filter = (m) => m.author.id === message.author.id;

        const appStart = await message.author.send(questions[collectCounter++]);
        const channel = appStart.channel;

        const collector = channel.createMessageCollector(filter);

        collector.on("collect", () => {
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter++]);
            } else {
                channel.send("Your application has been sent!");
                collector.stop("fulfilled");
            }
        });

        const appsChannel = client.channels.cache.get("822965529429934140");
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `${index++}) ${questions[endCounter++]}\n-> ${msg.content}`
                }).join('\n\n');

            appsChannel.send(
                new MessageEmbed()
                .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic : true })
                )
                .setTitle("New Application!")
                .setDescription(mappedResponses)
                .setColor("RANDOM")
                .setTimeStamp()
                );
            }
        })
    },
};