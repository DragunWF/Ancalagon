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
          `${chalk.bold("Guild Name:")} ${chalk.bold.underline(messageGuild)}\n`
        )
      );
      guild = messageGuild;
    }
    if (channel !== messageChannel) {
      output.push(chalk.bold.yellow(`#${messageChannel}\n`));
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

  static logCreatedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    log += `${chalk.bold.green(`[${message.author.tag}]:`)} ${message.content}`;
    console.log(log);

    fs.appendFile(
      "./data/logs/chat_logs.txt",
      chalk.reset(`${log}\n`),
      (error) => {
        if (error) console.log(error);
      }
    );
  }

  static logDeletedMessage(message) {
    let log = this.messageLogTemplate(message.guild.name, message.channel.name);
    const template = [
      chalk.bold.red("Deleted Message:"),
      `${chalk.bold.green(`[${message.author.tag}]`)} ${message.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    fs.appendFile(
      "./data/logs/deleted_logs.txt",
      chalk.reset(`${log}\n`),
      (error) => {
        if (error) console.log(error);
      }
    );
  }

  static logEditedMessage(oldMessage, newMessage) {
    let log = this.messageLogTemplate(
      oldMessage.guild.name,
      newMessage.channel.name
    );
    const template = [
      `${chalk.bold.red("Message Edit Event:")} ${chalk.bold.green(
        `(By: [${oldMessage.author.tag}])`
      )}`,
      `${chalk.bold.magenta("Before:")} ${oldMessage.content}`,
      `${chalk.bold.magenta("After:")} ${newMessage.content}`,
    ];
    for (let line of template) log += `${line}\n`;
    console.log(log);

    fs.appendFile(
      "./data/logs/edited_logs.txt",
      chalk.reset(`${log}\n`),
      (error) => {
        if (error) console.log(error);
      }
    );
  }
}

module.exports = MessageLogger;
