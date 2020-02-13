 


module.exports.run = async (bot, message, args) => {


if (message.deletable) message.delete();
      
      if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ ❌ Du hast keine Rechte um Personen zu entstummen")
    }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ Ich habe keine Rechte um diese Person zu entstummen")
  }
   let tomute = message.guild.member(message.mentions.members.first() || message.guild.members.get(args[0]));
      if(!tomute) {
        return message.channel.send("Wen soll ich entstummen?")
        .then(m => m.delete(10000));
      }
   if(!tomute) return message.reply("❌ Ich habe diese Person nicht gefunden.");
    let muterole = message.guild.roles.find(`name`, "muted");
  
  
   await(tomute.removeRole(muterole.id));
  message.channel.send(`<@${tomute.id}> ist entstummt`);

 } 
      
      
      
      
    module.exports.help = {
  name: "unmute",
  aliases: []
};