
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.deletable) message.delete();

        // No args
        if (!args[0]) {
            return message.reply("❌ Du brauchst einen Grund um diese Person zu bannen.")
                .then(m => m.delete(5000));
        }

        // No reason
        if (!args[1]) {
            return message.reply("❌ Du brauchst einen Grund um diese Person zu bannen.")
                .then(m => m.delete(5000));
        }

        // No author permissions
        if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Du hast keine Erlaubnis Personen zu bannen, bitte kontaktiere einen Admin.")
                .then(m => m.delete(5000));
        
        }
        // No bot permissions
        if (!message.guild.me.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Ich habe nicht die Erlaubnis um Personen zu bannen. Bitte kontaktiere eine Admin")
                .then(m => m.delete(5000));
        }

        const toBan = message.mentions.members.first() || message.guild.members.get(args[0]);

        // No member found
        if (!toBan) {
            return message.reply("❌ Ich habe diese Person nicht gefunden")
                .then(m => m.delete(5000));
        }

        // Can't ban urself
        if (toBan.id === message.author.id) {
            return message.reply("❌ Versuchst du **WIRKLICH** gerade dich selbst zu bannen?")
                .then(m => m.delete(5000));
        }

        // Check if the user's banable
        if (!toBan.bannable) {
            return message.reply("❌ Ich kann diese Person nicht bannen.")
                .then(m => m.delete(5000));
        }
        
        const embed = new Discord.RichEmbed()
            .setColor(bot.embedColor)
            .setThumbnail(toBan.user.displayAvatarURL)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`${toBan} (${toBan.id})\n**wurde aus dem Server gebannt** | Grund -->${args.slice(1).join(" ")}`);

      
     
         
              
        

                toBan.ban(args.slice(1).join(" "))
                    .catch(err => {
                        if (err) return message.channel.send(`Komisch... Der Ban hat irgendwie nicht funktioniert ${err}`)
                    });

                message.channel.send(embed)
            
        }
    

module.exports.help = {
  name: "ban",
  aliases: []
};
