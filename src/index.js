require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

const CommandProcessor = require("./utils/processor");
const MessageLogger = require("./utils/message_logger");

const processor = new CommandProcessor(Discord);
const logger = new MessageLogger();

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("The Universe", {
    type: "WATCHING",
    url: "https://dragonwf.netlify.app/",
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  logger.logMessage(message.content, message.author.tag);

  if (message.content.startsWith(prefix)) {
    message.channel.send(processor.processCommand(message, prefix));
  }
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  logger.logDeletedMessage(message.content, message.author.tag);
  processor.configureSniper(message, "deletedMessage");
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  logger.logEditedMessage(
    oldMessage.content,
    newMessage.content,
    oldMessage.author.tag
  );
  processor.configureSniper(oldMessage, "editedMessage");
});

client.login(process.env.TOKEN);
