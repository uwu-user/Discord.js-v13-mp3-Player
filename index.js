// v11 and v12 and v13 :3

/* 
    ////////  [1]  //////// 

// Discord.js v11.6.4
    > npms: {
    	Discord.js: ^11.6.4
       }
       
const { Client, RichEmbed } = require("discord.js");
const client = new Client();

client.login("YOU BOT TOKEN");

client.on("message", message => {
const file = message.attachments.first();
  if (message.content.startsWith("djs!play")) {
    try {
      const channel = message.member.voiceChannel;
      const Embed = new Discord.RichEmbed()
        .setAuthor("Command: play")
        .setFields: (
          {
            name: "Usege",
            value: `djs!play (file)`,
            inline: true
          },
          {
            name: "Examples",
            value: `djs!play ...`,
            inline: true
          })
        .setDescription("music command: play songs")
      if (!channel || !file) return message.channel.send(Embed);
      channel.join().then(connection => {
        const dispatcher = connection.playFile(file.url);
        message.channel.send("> playing: `" + file.name + "`, size: `" + file.size + "B`);
      });
    } catch (error) {
      message.channel.send(error.message || "Error");
    }
  }
});
*/

/*
   //////// [2] //////// 

// Discord.js v12.5.3
    > npms: {
    	Discord.js: ^12.5.3,
        node-opus: ^0.3.3
        ffmpeg: ^0.0.3
       }
       
   // FFmpeg
const ffmpeg = require("ffmpeg");
    
const { Client, MessageEmbed } = require("discord.js");
const client = new Client();

client.on("message", async message => {
const file = message.attachments.first();
  if (message.content.startsWith("djs!play")) {
    try {
      const channel = message.member.voice.channel;
      const Embed = new MessageEmbed()
        .setAuthor("Command: play")
        .setFields: (
          {
            name: "Usege",
            value: `djs!play (file)`,
            inline: true
          },
          {
            name: "Examples",
            value: `djs!play ...`,
            inline: true
          })
        .setDescription("music command: play songs")
      if (!channel || !file) return message.channel.send({ embed: Embed });
      channel.join().then(connection => {
        const dispatcher = connection.play(file.url);
        message.channel.send("> playing: `" + file.name + "`, size: `" + file.size + "B`);
      });
    } catch (error) {
      message.channel.send(error.message || "Error");
    }
  }
});
*/

/*
    //////// [3] //////// 
// Discord.js v13.1.0
    > npms: {
    	Discord.js: ^13.1.0,
        ffmpeg: ^0.0.4,
        node-opus: ^0.3.3
        @discordjs/voice: ^0.6.0
       }
*/
       
   //FFmpeg
const ffmpeg = require("ffmpeg");

const { Client, Intents, VoiceChannel, Discord, MessageEmbed } = require("discord.js");
const client = new Client({  intents: [ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES ]});

const { joinVoiceChannel,  createAudioPlayer,  createAudioResource, entersState, StreamType,  AudioPlayerStatus,  VoiceConnectionStatus } = require("@discordjs/voice");

const Player = createAudioPlayer();

client.login("YOU BOT TOKEN");

client.on("messageCreate", async message => {
  if (message.content.startsWith("djs!play")) {
    const file = message.attachments.first();
    const channel = message.member.voice.channel;
    const Embed = new MessageEmbed()
      .setAuthor("Command: play")
      .addFields(
        {
          name: "Usege",
          value: `djs!play (file)`,
          inline: true
        },
        {
          name: "Examples",
          value: `djs!play ...`,
          inline: true
        })
      .setDescription("music command: play songs");

    if (!channel || !file) return message.channel.send({ embeds: [Embed] });
    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator
    });

    try {
      connection;
      connection.subscribe(Player);

      const resource = createAudioResource(file.url, {
        inputType: StreamType.Arbitrary
      });

      Player.play(resource);
      message.channel.send({
        content: "> playing: `" + file.name + "`, size: `" + file.size + "B`"
      });
     } catch (error) {
      message.channel.send({ content: error.message || "Error" });
    }
  }
});
