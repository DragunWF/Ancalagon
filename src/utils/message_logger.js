const fs = require("fs");
const chalk = require("chalk");

let guild = null;
let channel = null;

class MessageLogger {
  static checkSameLocation(messageGuild, messageChannel) {
    let output = [];
    if (guild !== messageGuild) {
      output.push(
        chalk.blue(
          `${chalk.bold("Guild:")} ${chalk.bold.underline(messageGuild)}\n`
        )
      );
      guild = messageGuild;
    }
    if (channel !== messageChannel) {
      output.push(chalk.bold.yellow(`Channel: #${messageChannel}\n`));
      channel = messageChannel;
    }
    return output ? output : false;
  }

  static messageLogTemplate(guildName, channelName) {
    let log = "";
    let output = this.checkSameLocation(guildName, channelName);
    if (output) for (let line of output) log += line;
    return log;
  }

  static grabUnchalkedTemplate(type, message, afterEdit = null) {
    // chalk.reset() doesn't work so here's my workaround
    let output = "";
    const templates = {
      onLogTemplate: [
        `Guild: ${message.guild.name}`,
        `Channel: #${message.channel.name}`,
      ],
      onCreate: [`[${message.author.tag}]: ${message.content}`],
      onUpdate: [
        `Message Edit Event: (By: ${message.author.tag})`,
        `Before: ${message.content}`,
        `After: ${afterEdit}`,
      ],
      onDelete: [
        `Deleted Message (By: ${message.author.tag})`,
        `Contents: ${message.content}`,
      ],
    };
    for (let line of templates[type]) output += `${line}\n`;
    return output;
  }

  static storeLoggedMessage(type, locationWritten, message, afterEdit = null) {
    let output = [];
    let log = [];
    const locations = {
      onCreate: "./data/logs/chat_logs.txt",
      onDelete: "./data/logs/deleted_logs.txt",
      onUpdate: "./data/logs/edited_logs.txt",
    };

    const unchalkedLocation = locationWritten
      ? this.grabUnchalkedTemplate("onLogTemplate", message)
      : false;
    const unchalked = this.grabUnchalkedTemplate(
      type,
      message,
      afterEdit ? afterEdit : null
    );
    unchalkedLocation ? output.push(unchalkedLocation) : null;
    output.push(unchalked);
    for (let line of output) log += `${line}\n`;

    fs.appendFile(locations[type], log, (error) => {
      if (error) console.log(error);
    });
  }

  static logCreatedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    let isLocationWritten = log ? true : false;
    log += `${chalk.bold.green(`[${message.author.tag}]:`)} ${message.content}`;
    console.log(log);

    let unchalkedLog = "";
    const unchalkedLocation = this.grabUnchalkedTemplate(
      "onLogTemplate",
      message
    );
    const unchalked = this.grabUnchalkedTemplate("onCreate", message);
    const iterator = isLocationWritten
      ? unchalkedLocation.concat(unchalked)
      : unchalked;
    for (let line of iterator) unchalkedLog += `${line}\n`;
    fs.appendFile("./data/logs/chat_logs.txt", `${unchalkedLog}`, (error) => {
      if (error) console.log(error);
    });
  }

  static logDeletedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    const template = [
      chalk.bold.red(
        `Deleted Message: ${chalk.bold.green(`By: [${message.author.tag}]`)}`
      ),
      `${chalk.bold.magenta("Contents:")} ${message.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    this.storeLoggedMessage("onDelete", message);
  }

  static logEditedMessage(oldMessage, newMessage) {
    let log = this.messageLogTemplate(
      oldMessage.guild.name,
      newMessage.channel.name
    );
    let isLocationWritten = false;
    if (log) isLocationWritten = true;
    const template = [
      `${chalk.bold.red("Message Edit Event:")} ${chalk.bold.green(
        `(By: [${oldMessage.author.tag}])`
      )}`,
      `${chalk.bold.magenta("Before:")} ${oldMessage.content}`,
      `${chalk.bold.magenta("After:")} ${newMessage.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    this.storeLoggedMessage("onUpdate", oldMessage, newMessage.content);
  }
}

module.exports = MessageLogger;
