module.exports = {
  message: (bot, utils, config, discord, db) => {
    bot.on("message", async message => {
      if (message.author.bot) return;
      if (message.channel.type === "dm") return;

      let prefix = config.prefix;
      let args = message.content
        .slice(prefix.length)
        .trim()
        .split(" ");
      let cmd = args.shift().toLowerCase();
      let command;

      utils.load(discord, bot, config, message, args, message.guild);
      if (!message.content.startsWith(config.prefix)) return;
      if (bot.commands.has(cmd)) {
        command = bot.commands.get(cmd);
      } else if (bot.aliases.has(cmd)) {
        command = bot.commands.get(bot.aliases.get(cmd));
      }

      if (config.commandNotFound == true) {
        try {
          command.run(bot, message, args);
        } catch (err) {
          if (err)
            utils.timed_msg(
              utils.cmd_fail(
                `Command \`${cmd}\` is not found!`,
                `${prefix}play <MUSIC/URL>`
              ),
              5000
            );
        }
      } else {
        try {
          command.run(bot, message, args);
        } catch (err) {
          if (err) return undefined;
        }
      }
      const fetch = require("node-fetch")
    });
    
    bot.on("guildMemberAdd", async member => {
      
      let msg = await db.fetch(`wchannel_${member.guild.id}`)
      if(msg === null) return;
      const emb = new discord.RichEmbed()
      .setTitle(`Willkommen ${member.user.username}`)
      .setDescription(msg)
      .setThumbnail(member.user.avatarURL)
      .setColor("#ff2050")
      .setFooter(":D");
      
      member.send(emb);
      
      }
      )
      
      
    
            
  }
};
