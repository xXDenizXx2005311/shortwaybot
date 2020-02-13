const utils = require("../global/utils");
const config = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  let queue = bot.queue.get(message.guild.id);
  if (!message.member.voiceChannel)
    return [
      message.delete(),
      utils.timed_msg(
        utils.cmd_fail(
          `${message.author}, Bitte join einen Musik Kanal!`,
          `${config.prefix}stop`
        ),
        5000
      )
    ];
  if (!queue)
    return [
      message.delete(),
      utils.timed_msg("⚠ Es läuft keine Musik.", 5000)
    ];

  queue.musics = [];
  queue.connection.dispatcher.end();
};

module.exports.help = {
  name: "stop",
  aliases: ["leave" , "dc" , "fuckoff"]
};
