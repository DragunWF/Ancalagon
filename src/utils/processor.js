import fs from "fs";

import HelpCommand from "../commands/help.js";
import InfoCommand from "../commands/info.js";
import PingCommand from "../commands/ping.js";
import SnipeCommand from "../commands/snipe.js";
import InspireCommand from "../commands/inspire.js";
import SetupCommand from "../commands/setup.js";

const help = new HelpCommand();
const info = new InfoCommand();
const ping = new PingCommand();
const sniper = new SnipeCommand();
const inspire = new InspireCommand();
const setup = new SetupCommand();

const commands = JSON.parse(fs.readFileSync("./data/bot/commands.json"));
const executions = [
  [ping.getBotLatency, ping],
  [help.processHelpCommand, help],
  [inspire.sendQuoteData, inspire],
  [sniper.snipeDeletedMessage, sniper],
  [sniper.snipeEditedMessage, sniper],
  [info.getBotInformation, sniper],
  [setup.processSetupCommand, setup],
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

    const parameters = [];
    for (let cmd of commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        parameters.push(cmd.object);
        if (cmd.hasMsgParameter) parameters.push(command);
        if (cmd.hasArgs) parameters.push(args);
        if (!cmd.isAsync) return cmd.execution(...parameters);
        cmd.execution(...parameters);
      }
    }
    return false;
  }
}

export default CommandProcessor;
