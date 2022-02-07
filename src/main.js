require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

const CommandProcessor = require("./utils/processor");
const MessageLogger = require("./utils/message_logger");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("The Galaxy [$help]", {
    type: "WATCHING",
    url: "https://dragonwf.netlify.app/",
  });
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  MessageLogger.logCreatedMessage(message.content, message.author.tag);

  if (message.content.startsWith(prefix)) {
    const output = CommandProcessor.processCommand(message, prefix);
    if (output) message.channel.send(output);
  }
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  MessageLogger.logDeletedMessage(message.content, message.author.tag);
  CommandProcessor.configureSniper(message, "deletedMessage");
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  MessageLogger.logEditedMessage(
    oldMessage.content,
    newMessage.content,
    oldMessage.author.tag
  );
  CommandProcessor.configureSniper(oldMessage, "editedMessage");
});

client.login(process.env.TOKEN);
