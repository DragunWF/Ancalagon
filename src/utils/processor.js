const fs = require("fs");

const HelpCommand = require("../commands/help");
const InfoCommand = require("../commands/info");
const PingCommand = require("../commands/ping");
const SnipeCommand = require("../commands/snipe");
const InspireCommand = require("../commands/inspire");

const help = new HelpCommand();
const info = new InfoCommand();
const ping = new PingCommand();
const sniper = new SnipeCommand();
const inspire = new InspireCommand();

const commands = JSON.parse(fs.readFileSync("./data/bot/commands.json"));
const executions = [
  [ping.getBotLatency, ping],
  [help.processHelpCommand, help],
  [inspire.sendQuoteData, inspire],
  [sniper.snipeDeletedMessage, sniper],
  [sniper.snipeEditedMessage, sniper],
  [info.getBotInformation, sniper],
];

class CommandProcessor {
  static configureSniper(message, type) {
    if (type === "deletedMessage") sniper.storeDeletedMessage(message);
    else sniper.storeOriginalMessage(message);
  }

  static mapCommandExecutions() {
    for (let i = 0; i < commands.length; i++) {
      commands[i].execution = executions[i][0];
      commands[i].object = executions[i][1];
    }
  }

  static processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    for (let cmd of commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        if (cmd.hasMsgParameter) {
          if (!cmd.hasArgs) return cmd.execution(cmd.object, command);
          return cmd.execution(cmd.object, command, args);
        }
        if (cmd.hasArgs) return cmd.execution(cmd.object, args);
        return cmd.execution(cmd.object);
      }
    }
    return false;
  }
}

module.exports = CommandProcessor;
