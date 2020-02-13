const discord = require("discord.js");
const { prefix } = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setTitle('Bug Report')
.addField("Sollten dem Bot Übersetzungen fehlen dann wende dich an", '--> ÐΞЛłZ#2433')
 

  .setThumbnail(bot.user.displayAvatarURL)
  .setColor(bot.embedColor)
  message.channel.send(embed);
};

module.exports.help = {
  name: "bug",
  aliases: []
};
