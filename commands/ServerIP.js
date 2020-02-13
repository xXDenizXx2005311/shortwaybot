const discord = require("discord.js");
const { prefix } = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setTitle('Shortway IP')
.addField("Shortway Server IP:", '--> 151.80.53.162:30124')
 

  .setThumbnail(bot.user.displayAvatarURL)
  .setColor(bot.embedColor)
  message.channel.send(embed);
};

module.exports.help = {
  name: "shortwayip",
  aliases: ["ip"]
};
