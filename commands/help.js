const discord = require("discord.js");
const { prefix } = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let embed = new discord.RichEmbed()
    .setTitle('Commands')
.addField("Musik Commands", '!play, !pause, !resume, !skip, !queue, !lyrics, !loop, !nowplaying, !stop')
  .addField("Moderation Commands", "!ban, !forceban, !kick, !permmute, !mute, !unmute, !setdm, !clear, !stats, !ping")
  .addField("Sonstiges",  "!ayou, !ts, !ip ( Shortway IP Adresse ), !bug, !dm, !regelwerk")

  .setThumbnail(bot.user.displayAvatarURL)
  .setColor(bot.embedColor)
  message.channel.send(embed);
};

module.exports.help = {
  name: "help",
  aliases: []
};
