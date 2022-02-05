const discord = require("discord.js");
const client = new discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";
require("dotenv").config();

const MessageLogger = require("./utils/message_logger");
const logger = new MessageLogger();

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
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (message.author.bot) return;
  logger.logEditedMessage(
    oldMessage.content,
    newMessage.content,
    oldMessage.author.tag
  );
});

function processCommand(command) {
  const [commandName, ...args] = command.content
    .trim()
    .substring(prefix.length)
    .split(/\s+/);

  if (commandName === "help") command.channel.send("**In construction**");
}

client.login(process.env.TOKEN);
