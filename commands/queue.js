const discord = require("discord.js");
const utils = require("../global/utils");
let looping;
module.exports.run = async (bot, message, args) => {
  let queue = bot.queue.get(message.guild.id);
  if (!queue)
    return [
      message.delete(),
      utils.timed_msg("⚠ Derzeitig Spielt keine Musik.", 5000)
    ];
  if (queue.loop) {
    looping = "an";
  } else {
    looping = "aus";
  };
  
  let embed = new discord.RichEmbed()
    .setColor(bot.embedColor)
    .setThumbnail(message.guild.iconURL)
    .setTitle("Music Liste")
    .setDescription(
      `${queue.musics
        .map(music => `- **[${music.title}](${music.url})**`)
        .join("\n")} `
    )
    .addField(
      "Now Playing",
      `[${queue.musics[0].title}](${queue.musics[0].url})`
    )
    .addField(
      "Einstellungen"
      `Volume : **${queue.volume}**\nLooping: **${looping}**`
    );

  message.channel.send(embed);
};

module.exports.help = {
  name: "queue",
  aliases: ["list", "musiclist", "songlist"]
};
