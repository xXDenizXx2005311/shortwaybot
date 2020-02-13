module.exports.run = async (bot, message, args) => {
   if (message.deletable) {
            message.delete();
        }
      
    
        // Member doesn't have permissions
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("❌ DU hast keine Rechte um Nachrichten zu löschen.");
        }

        // Check if args[0] is a number
        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.channel.send("❌ Du kannst leider nicht 0 Nachrichten Löschen :rofl: ");
        }

        // Maybe the bot can't delete messages
        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.channel.send("❌ Sorry... Ich habe keine Rechte um Nachrichten zu löschen.");
        }

        let deleteAmount;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`Ich habe \`${deleted.size}\` Nachricht/en gelöscht.`))
            .catch(err => message.channel.send(`Irgendetwas ist schief gelaufen... ${err}`));
    
}

module.exports.help = {
  name: "clear",
  aliases: []
};