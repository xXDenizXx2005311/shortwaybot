const discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) {
    return message.channel.send({
      embed: {
        description:
          "❌ Du hast keine Rechte um die Wilkommensnachricht zu setzen/ ändern. Bitte kontaktiere einen Admin",
        color: 0xff2050
      }
    });
  }


if(!args[0]) return message.channel.send("Was ist die Wilkommensnachricht?")



  db.set(`wchannel_${message.guild.id}`, `${args.join(" ")}`);
  message.channel.send({
    embed: {
      description: `Willkommensnachricht wurde erfolgreich gesetz!`,
      color: 0xff2050
    }
  });
};
module.exports.help = {
  name: "set-dm",
  aliases: ["setdm"]
};
