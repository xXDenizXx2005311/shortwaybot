const Discord = require('discord.js');
//const PREFI = require('../../config');
const talkedRecently = new Set();

module.exports.run = async (bot, message, args) => {
    if (talkedRecently.has(message.author.id)) {
    message.channel.send("❌ Sorry aber du musst 5 Minuten warten um eine weitere Nachricht zu verschicken.");
    message.delete();
    return;
  }
    talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 300000);

var mention = message.mentions.users.first();
if (mention == null) return message.channel.send('❌ Du musst eine Person und eine Nachricht eingeben');
    if (!args[1]) return message.channel.send('❌ Schreibe die Nachricht die du dem Empfänger senden willst');
if (!mention == null) return message.channel.send('❌ Ich habe diese Person nicht gefunden!')
  let rreason = args.join(" ").slice(22);
    let dm = new Discord.RichEmbed()
    .setTitle(`DM MESSAGE`)
    .setColor('#ff2052')
    .setDescription(`${rreason}`)
    .setThumbnail(`${message.author.avatarURL}`)
    .setFooter(`Sended by ${message.author.username}`);

  mention.send(dm);
  message.channel.send("Nachricht wurde verschickt")
}

module.exports.help = {
  name: "dm",
  aliases: []
};