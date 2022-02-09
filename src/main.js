require("dotenv").config();

const Discord = require("discord.js");
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

const CommandProcessor = require("./utils/processor");
const MessageLogger = require("./utils/message_logger");
const KeyWordResponder = require("./utils/keyword_responder");
const keepServerRunning = require("./utils/server");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity("The Galaxy [$help]", {
    type: "WATCHING",
    url: "https://dragonwf.netlify.app/",
  });
  CommandProcessor.mapCommandExecutions();
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;
  MessageLogger.logCreatedMessage(message);

  if (message.content.startsWith(prefix)) {
    const output = CommandProcessor.processCommand(message, prefix);
    if (output) message.channel.send(output);
  }

  const response = KeyWordResponder.checkMessage(message.content);
  if (response) message.channel.send(response);
});

client.on("messageDelete", (message) => {
  if (message.author.bot) return;
  MessageLogger.logDeletedMessage(message);
  CommandProcessor.configureSniper(message, "deletedMessage");
});

client.on("messageUpdate", (oldMessage, newMessage) => {
  if (oldMessage.author.bot) return;
  MessageLogger.logEditedMessage(oldMessage, newMessage);
  CommandProcessor.configureSniper(oldMessage, "editedMessage");
});

if (require.main === module) {
  keepServerRunning();
  client.login(process.env.TOKEN);
}
