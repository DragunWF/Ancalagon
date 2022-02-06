const HelpCommand = require("../commands/help");
const InfoCommand = require("../commands/info");
const MessageSniper = require("../commands/snipe");

const help = new HelpCommand();
const info = new InfoCommand();
const sniper = new MessageSniper();

class CommandProcessor {
  constructor(Discord) {
    this.Discord = Discord;
    this.commands = [
      ["help", help.processHelpCommand, true, help],
      ["snipe", sniper.snipeDeletedMessage, false, sniper],
      ["esnipe", sniper.snipeEditedMessage, false, sniper],
      ["info", info.getBotInformation, false, info],
    ];
    this.snipeCommands = [this.commands[1][0], this.commands[2][0]];
  }

  configureSniper(message, type) {
    if (type === "deletedMessage") sniper.storeDeletedMessage(message);
    else sniper.storeOriginalMessage(message);
  }

  processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);
    for (let cmd of this.commands) {
      if (commandName === cmd[0]) {
        if (this.snipeCommands.includes(cmd[0])) return cmd[1](sniper);
        if (cmd[2]) return cmd[1](cmd[3], args);
        return cmd[1](cmd[3]);
      }
    }
    return false;
  }
}

module.exports = CommandProcessor;

// Commands list slot purposes
// [commandName, commandFunction, doesCommandHaveParameters, reference]
