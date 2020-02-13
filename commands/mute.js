module.exports.run = async (bot, message, args) => {
  if (message.deletable) message.delete();

   if (!message.member.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ Du hast keine Rechte um Personen stumm zu schalten")
    }
  if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
            return message.reply("❌ Ich habe keine Rechte um diese Person stumm zu schalten")
  }
      
   let tomute = message.mentions.members.first();
      if(!tomute) {
        return message.channel.send("Wen soll ich stumm schalten?")
        .then(m => m.delete(10000));
      }
      if (tomute.id === message.author.id) {
            return message.reply("❌ Du kannst dich nicht selber stumm schalten")
                .then(m => m.delete(10000));
        }
      
   if(!tomute) return message.reply("❌ Ich habe diese Person nicht gefunden.");
    let muterole = message.guild.roles.find(`name`, "muted");
    
   if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
   await(tomute.addRole(muterole.id));
  message.channel.send(`<@${tomute.id}> ist gestummt`);  
 }
    



module.exports.help = {
  name: "permmute",
  aliases: []
};