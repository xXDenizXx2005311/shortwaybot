const discord = require("discord.js");
const { prefix } = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setTitle('Shortway Regelwerk')
.addField("Regelwerk", '--> https://docs.google.com/document/d/1-5oqm8xEEq7mE12oxiBAY0J4oqDnXha3Ga_S0vPw8dQ/edit?usp=sharing')
 

  .setThumbnail(bot.user.displayAvatarURL)
  .setColor(bot.embedColor)
  message.channel.send(embed);
};

module.exports.help = {
  name: "regelwerk",
  aliases: ["regeln", "rw", "shortwayregeln", "srw"]
};
