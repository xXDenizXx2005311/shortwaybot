const utils = require("../global/utils");

module.exports.run = async (bot, message, args) => {
  let queue = bot.queue.get(message.guild.id);

  if (queue && queue.playing) {
    queue.playing = false;
    queue.connection.dispatcher.pause();
    return message.react('▶')
  }

  return [
    message.delete(),
    utils.timed_msg("⚠ Es läuft keine Musik.", 5000)
  ];
};

module.exports.help = {
  name: "pause",
  aliases: []
};
