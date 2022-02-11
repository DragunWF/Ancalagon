const fs = require("fs");
const chalk = require("chalk");

let guild = null;
let channel = null;
let eventCog = false;

class MessageLogger {
  static checkSameLocation(messageGuild, messageChannel, unchalked, storing) {
    const output = [];
    const templates = {
      chalked: [
        chalk.blue(
          `${chalk.bold("Guild:")} ${chalk.bold.underline(messageGuild)}\n`
        ),
        chalk.bold.yellow(`Channel: #${messageChannel}\n`),
      ],
      unchalked: [`Guild: ${messageGuild}`, `Channel: #${messageChannel}`],
    };
    const template = unchalked ? templates.unchalked : templates.chalked;
    if (guild !== messageGuild) {
      output.push(template[0]);
      if (storing) guild = messageGuild;
    }
    if (channel !== messageChannel) {
      output.push(template[1]);
      if (storing) channel = messageChannel;
    }
    return output ? output : false;
  }

  static messageLogTemplate(guildName, channelName) {
    let log = "";
    const output = this.checkSameLocation(guildName, channelName, false, false);
    if (output) for (let line of output) log += line;
    return log;
  }

  static grabUnchalkedTemplate(type, message, afterEdit = null) {
    // chalk.reset() doesn't work so here's my workaround
    let output = [];
    const templates = {
      onCreate: [`[${message.author.tag}]: ${message.content}`],
      onUpdate: [
        `Message Edit Event: (By: ${message.author.tag})`,
        `Before: ${message.content}`,
        `After: ${afterEdit}\n`,
      ],
      onDelete: [
        `Deleted Message (By: ${message.author.tag})`,
        `Contents: ${message.content}\n`,
      ],
    };
    for (let line of templates[type]) output.push(line);
    return output;
  }

  static storeLoggedMessage(type, message, afterEdit = null) {
    let log = "";
    const locations = {
      onCreate: "./data/logs/chat_logs.txt",
      onDelete: "./data/logs/deleted_logs.txt",
      onUpdate: "./data/logs/edited_logs.txt",
    };
    const logLocation = this.checkSameLocation(
      message.guild.name,
      message.channel.name,
      true,
      true
    );
    if (logLocation) for (let line of logLocation) log += `${line}\n`;

    const unchalkedTemplate = this.grabUnchalkedTemplate(
      type,
      message,
      afterEdit ? afterEdit : null
    );
    for (let line of unchalkedTemplate) log += `${line}\n`;

    fs.appendFile(locations[type], log, (error) => {
      if (error) console.log(error);
    });
  }

  static logCreatedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    log += `${chalk.bold.green(`[${message.author.tag}]:`)} ${message.content}`;
    console.log(log);

    eventCog = true;
    this.storeLoggedMessage("onCreate", message);
  }

  static logDeletedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    let newline = eventCog ? "\n" : "";
    const template = [
      chalk.bold.red(
        `${newline}Deleted Message: ${chalk.bold.green(
          `(By: ${message.author.tag})`
        )}`
      ),
      `${chalk.bold.magenta("Contents:")} ${message.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    eventCog = false;
    this.storeLoggedMessage("onDelete", message);
  }

  static logEditedMessage(oldMessage, newMessage) {
    let log = this.messageLogTemplate(
      oldMessage.guild.name,
      newMessage.channel.name
    );
    let newline = eventCog ? "\n" : "";
    const template = [
      `${newline}${chalk.bold.red("Message Edit Event:")} ` +
        `${chalk.bold.green(`(By: ${oldMessage.author.tag})`)}`,
      `${chalk.bold.magenta("Before:")} ${oldMessage.content}`,
      `${chalk.bold.magenta("After:")} ${newMessage.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    eventCog = false;
    this.storeLoggedMessage("onUpdate", oldMessage, newMessage.content);
  }
}

module.exports = MessageLogger;
