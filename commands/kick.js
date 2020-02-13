const discord = require("discord.js");
const embed = new discord.RichEmbed();
module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
            return message.reply("❌ Du brauchst einen Grund um diese Person zu kicken!")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return message.reply("❌ Du brauchst einen Grund um diese Person zu kicken!")
                .then(m => m.delete(5000));
        }

        // No author permissions
        if (!message.member.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Du hast keine Erlaubnis Personen zu kicken, bitte kontaktiere einen Admin.")
                .then(m => m.delete(5000));
        }

        // No bot permissions
        if (!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.reply("❌ Ich habe nicht die Erlaubnis um Personen zu kicken. Bitte kontaktiere eine Admin")
                .then(m => m.delete(5000));
        }

        const toKick = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toKick) {
            return message.reply("❌ Ich habe diese Person nicht gefunden")
                .then(m => m.delete(5000));
        }

        // Can't kick urself
        if (toKick.id === message.author.id) {
            return message.reply("❌ Versuchst du **WIRKLICH** gerade dich selbst zu kicken?")
                .then(m => m.delete(5000));
        }

        // Check if the user's kickable
        if (!toKick.kickable) {
            return message.reply("❌ Ich kann diese Person nicht kicken.")
                .then(m => m.delete(5000));
        }
                
        const mbed = new discord.RichEmbed()
            .setColor(bot.embedColor)
            .setThumbnail(toKick.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`${toKick} (${toKick.id})\n**wurde aus dem Server gekickt** | Grund --> ${args.slice(1).join(" ")}`);

      
   

          

                toKick.kick(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Komisch.... Irgendetwas ist da schief gelaufen ${err}`)
                    });

                message.channel.send(mbed)
         
    }



module.exports.help = {
  name: "kick",
  aliases: []
};
