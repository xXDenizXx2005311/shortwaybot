module.exports.run = async (bot, message, args) => {
   if (!message.member.hasPermission("BAN_MEMBERS")) {
            return message.reply("❌ Du hast keine Erlaubnis Personen zu bannen, bitte kontaktiere einen Admin.");
   }
  

   if (!args[0]) return message.channel.send("Ich brauche eine ID dafür");
  if(args[0] === message.author.id) return message.channel.send("Versuchst du **WIRKLICH** gerade dich selbst zu bannen?");
    let dead = args[0];
    message.guild.ban(dead).then(() => {
        message.channel.send(`\`${args[0]}\` Die Person wurde geforecbannt`)
    
    }).catch(err => {
        message.channel.send("Die ID `"+message.args[0]+"` das ist kein gültiger syntax.");
    })
}



module.exports.help = {
  name: "forceban",
  aliases: ["fban"]
};