const utils = require("../global/utils");
const config = require("../settings/config.json");
let Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let queue = bot.queue.get(message.guild.id);
  if (!queue)
    return [
      message.delete(),
      utils.timed_msg("⚠ Es läuft keine Musik.", 5000)
    ];

  if (!args[0])
    return [
      message.delete(),
      message.channel.send(new Discord.RichEmbed()
                          .setDescription(`Aktuelle Lautstärke **${queue.volume} / 100**`))
    ];
  if (isNaN(args[0]))
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(
          `${message.author}, Du kannst nur zwischen 1 - 100 auswählen!`,
          `${config.prefix}volume <volume>`
        ),
        5000
      )
    ];
  if (args[0] < 0 || args[0] > 100)
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(
          `${message.author}, Du kannst nur zwischen 1 - 150 auswählen!`,
          `${config.prefix}volume <volume>`
        ),
        5000
      )
    ];

  queue.volume = args[0];
  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);

  return message.channel.send(
    new Discord.RichEmbed()
    .setDescription(`Lautstärke ist nun **${queue.volume} / 100**`)
    .setColor(bot.embedColor)
    
  );
};

module.exports.help = {
  name: "volume",
  aliases: ["vol" , "v"]
};
