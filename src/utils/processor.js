const MessageSniper = require("../commands/snipe");
const HelpCommand = require("../commands/help");

const help = new HelpCommand();

class CommandProcessor {
  constructor(Discord) {
    this.Discord = Discord;
    this.sniper = new MessageSniper();
    this.commands = [
      ["help", help.getCommandList, "none"],
      ["snipe", this.sniper.snipeDeletedMessage, "embed"],
      ["esnipe", this.sniper.snipeEditedMessage, "embed"],
    ];
  }

  configureSniper(message, type) {
    if (type === "deletedMessage") this.sniper.storeDeletedMessage(message);
    else this.sniper.storeOriginalMessage(message);
    this.commands[1][1] = this.sniper.snipeDeletedMessage;
    this.commands[2][1] = this.sniper.snipeEditedMessage;
  }

  processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);
    const commandList = this.commands;
    for (let cmd of commandList) {
      if (commandName === cmd[0]) {
        if (cmd[2] === "embed") return cmd[1](this.Discord);
        return cmd[1]();
      }
    }
  }
}

module.exports = CommandProcessor;
