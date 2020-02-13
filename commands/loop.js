

const discord = require("discord.js");
const { prefix } = require("../settings/config.json");
const embed = new discord.RichEmbed();
module.exports.run = async (bot, message, args) => {
  const queue = bot.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return message.channel.send("Du bist nicht in einen Voice Kanal");
  if (!queue) return message.channel.send("Ich spiele doch nichts?");
  queue.loop = !queue.loop;
  bot.queue.set(message.guild.id, queue);
  if (queue.loop) return message.channel.send(new discord.RichEmbed()
                                             .setDescription("**Musik Loop an!**")
                                             .setColor(bot.embedColor));
  return message.channel.send(new discord.RichEmbed()
                             .setDescription("**Musik Loop aus!**")
                             .setColor(bot.embedColor));
};

module.exports.help = {
  name: "loop",
  aliases: ["replay", "restart"]
};
