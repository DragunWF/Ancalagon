import "dotenv/config";
import Discord from "discord.js";

import CommandProcessor from "./utils/processor.js";
import MessageLogger from "./utils/message_logger.js";
import KeyWordResponder from "./utils/keyword_responder.js";
import Counter from "./utils/counter.js";
import keepServerRunning from "./utils/server.js";

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] });
const prefix = "$";

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

  if (message.content.startsWith(prefix))
    CommandProcessor.processCommand(message, prefix);

  Counter.checkCount(message);
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

keepServerRunning();
client.login(process.env.TOKEN);
