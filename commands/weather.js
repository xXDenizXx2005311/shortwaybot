const Discord = module.require("discord.js")
const weather = require("weather-js")

module.exports.run = async (bot, message, args) => {
    weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
        if(err) message.channel.send(err)

        //If the place entered is invalid
        if(result.length === 0) {
            message.channel.send({embed: {
              "description": "Das ist kein existierender Ort",
              "color": 0xff2050
            }})
            return;
        }

        //Variables
        var current = result[0].current //Variable for the current part of the JSON Output
        var location = result[0].location //This is a variable for the location part of the JSON Output

        //Sends weather log in embed
        let embed = new Discord.RichEmbed()
           .setDescription(`**${current.skytext}**`) //How the sky looks like
           .setAuthor(`Weather for ${current.observationpoint}`) //Shows the current location of the weater
           .setThumbnail(current.imageUrl) //Sets thumbnail of the embed
           .setColor(bot.embedColor) //Sets the color of the embed
           .addField("Zeitzone", `UTC${location.timezone}`, true) //Shows the timezone
           .addField("Celcius typ", location.degreetype, true) //Shows the degrees in Celcius
           .addField("Temperatur", `${current.temperature}`, true)
           .addField("Fühlt sich an wie", `${current.feelslike} Degrees`, true)
           .addField("Wind", current.winddisplay, true)
           .addField("Feuchtigkeit", ` ${current.humidity}%`, true)
           .addField("Tag", `${current.day}`, true)
           .addField("Datum", `${current.date}`, true)
           
           //Display when it's called
           message.channel.sendEmbed(embed)

    });

    message.delete();
    
    }

module.exports.help = {
  name: "weather",
  aliases: ["w"]
};
