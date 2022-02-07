const HelpCommand = require("../commands/help");
const InfoCommand = require("../commands/info");
const PingCommand = require("../commands/ping");
const MessageSniper = require("../commands/snipe");
const InspireCommand = require("../commands/inspire");

const help = new HelpCommand();
const info = new InfoCommand();
const ping = new PingCommand();
const sniper = new MessageSniper();
const inspire = new InspireCommand();

const commands = [
  ["ping", ping.getBotLatency, false, ping],
  ["help", help.processHelpCommand, true, help],
  ["inspire", inspire.sendQuoteData, false, inspire],
  ["snipe", sniper.snipeDeletedMessage, false, sniper],
  ["esnipe", sniper.snipeEditedMessage, false, sniper],
  ["info", info.getBotInformation, false, info],
];

class CommandProcessor {
  static configureSniper(message, type) {
    if (type === "deletedMessage") sniper.storeDeletedMessage(message);
    else sniper.storeOriginalMessage(message);
  }

  static processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    for (let cmd of commands) {
      if (commandName === cmd[0]) {
        if (cmd[0] === "ping") return cmd[1](cmd[3], command);
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
