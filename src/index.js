require("dotenv").config();
const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  console.log(`[${message.author.tag}]: ${message.content}`);

  if (message.content.startsWith(prefix)) {
    const [commandName, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    if (commandName === "help") message.channel.send("**In construction**");
  }
});

client.login(process.env.TOKEN);
