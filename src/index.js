require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

const MessageLogger = require("./utils/message_logger");
const MessageSniper = require("./commands/snipe");

const logger = new MessageLogger();
const sniper = new MessageSniper();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  logger.logMessage(message.content, message.author.tag);

  if (message.content.startsWith(prefix)) {
    processCommand(message);
  }
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  logger.logDeletedMessage(message.content, message.author.tag);
  sniper.storeDeletedMessage(message);
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  logger.logEditedMessage(
    oldMessage.content,
    newMessage.content,
    oldMessage.author.tag
  );
  sniper.storeOriginalMessage(oldMessage);
});

function processCommand(command) {
  const [commandName, ...args] = command.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

  // Going to change this part in the future
  if (commandName === "help") command.channel.send("**In construction**");
  if (commandName === "snipe")
    command.channel.send(sniper.snipeDeletedMessage(Discord));
  if (commandName === "esnipe")
    command.channel.send(sniper.snipeEditedMessage(Discord));
}

client.login(process.env.TOKEN);
