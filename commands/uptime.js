const Discord = require('discord.js');
const moment = require("moment");


module.exports.run = async (client, message, args) => {

    let u = convertMS(client.uptime);
    let uptime = u.d + " Tage : " + u.h + " Stunden : " + u.m + " Minuten : " + u.s + " Sekunden"




    const duration = moment.duration(client.uptime)
    let bicon = client.user.displayAvatarURL;
    const botembed = new Discord.RichEmbed()
        .setColor(client.embedColor)
        .setTitle(`:control_knobs: **Uptime :**  ${uptime}`)
      
        .setThumbnail(bicon);

    message.channel.send(botembed);


function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
}
}

module.exports.help = {
  name: "status",
  aliases: []
};
