const utils = require("../global/utils");
const config = require("../settings/config.json");

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR"))
    return utils.timed_msg(
      utils.no_perm(
        `${message.author}, du hast keine Erlaubnis für diesen Command!`
      ),
      5000
    );

  let command = args[0];
  if (!command)
    return utils.timed_msg(
      utils.cmd_fail(
        "Bitte füge einen Command hinzu um neuzuladen"
        `${config.prefix}reload <command>`
      ),
      5000
    );

  let response = await bot.unloadCommand(command);
  if (response) return [message.delete(), utils.timed_msg(response, 5000)];

  response = bot.loadCommand(command);
  if (response) return [message.delete(), utils.timed_msg(response, 5000)];

  return [
    message.delete(),
    utils.timed_msg(`:thinking: ${command}.js wurde erfolgreich neugeladen!`, 5000)
  ];
};

module.exports.help = {
  name: "reload",
  aliases: ["rl"]
};
