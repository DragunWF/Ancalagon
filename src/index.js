require("dotenv").config();
const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;

  console.log(`[${message.author.tag}]: ${message.content}`);
  if (message.content.startswith(prefix))
    message.channel.send("Type $help to get the list of commands");
});

client.login(process.env.TOKEN);
