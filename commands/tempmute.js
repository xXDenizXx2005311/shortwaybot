const { RichEmbed } = require("discord.js")
const ms = require("ms");
 
module.exports.run = async (bot, message, args) => {
// check if the command caller has permission to use the command
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("❌ Du hast keine Rechte um Personen stumm zu schalten");
 
if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("❌ Ich habe keine Rechte um diese Person stumm zu schalten")
     
//define the reason and mutee
let time = args[1];
let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) {
        return message.channel.send("Wen soll ich stummen?")
        .then(m => m.delete(10000));
      }
      if (mutee.id === message.author.id) {
            return message.reply("Du kannst dich nicht selber stumm schalten...")
                .then(m => m.delete(10000));
        }
      
  
 
let reason = args.slice(2).join(" ");
if(!reason) reason = "Kein Grund angegeben"
 
//define mute role and if the mute role doesnt exist then create one
let muterole = message.guild.roles.find(r => r.name === "muted")
if(!muterole) {
    try{
        muterole = await message.guild.createRole({
            name: "muted",
            color: "#FB0101",
            permissions: []
        })
        message.guild.channels.forEach(async (channel, id) => {
            await channel.overwritePermissions(muterole, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SEND_TTS_MESSAGES: false,
                ATTACH_FILES: false,
                SPEAK: false
            })
        })
    } catch(e) {
        console.log(e.stack);
    }
}
 
//add role to the mentioned user and also send the user a dm explaing where and why they were muted
mutee.addRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hi, du wurdest in \`${message.guild.name}\`\nstummgeschalten -> Grund: \`${reason}\`\nTime: \`${ms(ms(time))}\``).catch(err => console.log(err))
   
})
setTimeout(function(){
  mutee.removeRole(muterole.id)
  mutee.send(`Du bist nun entstummt auf \`${message.guild.name}\``)



}, ms(time))
//send an embed to the modlogs channel
 

message.channel.send(`${mutee.user.tag} wurde gestummt für --> ${ms(ms(time))}`)
    }

 module.exports.help = {
  name: "tempmute",
  aliases: ["mute"]
};