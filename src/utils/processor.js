import fs from "fs";

import HelpCommand from "../commands/help.js";
import InfoCommand from "../commands/info.js";
import PingCommand from "../commands/ping.js";
import SnipeCommand from "../commands/snipe.js";
import InspireCommand from "../commands/inspire.js";
import SetupCommand from "../commands/setup.js";
import CryptoCommand from "../commands/crypto.js";
import EconomyCommand from "../commands/economy.js";

import { GuessCommand, GuessingHandler } from "../commands/guessing_game.js";

const help = new HelpCommand();
const info = new InfoCommand();
const ping = new PingCommand();
const sniper = new SnipeCommand();
const inspire = new InspireCommand();
const setup = new SetupCommand();
const crypto = new CryptoCommand();
const economy = new EconomyCommand();
const guess = new GuessCommand();

const commands = JSON.parse(fs.readFileSync("./data/bot/commands.json"));
const executions = [
  [ping.getBotLatency, ping],
  [help.processHelpCommand, help],
  [inspire.sendQuoteData, inspire],
  [sniper.snipeDeletedMessage, sniper],
  [sniper.snipeEditedMessage, sniper],
  [info.getBotInformation, sniper],
  [setup.processSetupCommand, setup],
  [crypto.sendCryptoData, crypto],
  [economy.scavenge, economy],
  [economy.balance, economy],
  [economy.leaderboard, economy],
  [economy.rulerModify, economy],
  [economy.rulerModify, economy],
  [guess.processCommand, guess],
];

class CommandProcessor {
  static updateGame(message, gameType) {
    switch (gameType) {
      case "guessingGame":
        GuessingHandler.checkGame(guess, message);
    } // More games will be added in the future
  }

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

  static checkSpecialCommand(command) {
    const specialCommands = ["reward", "punish"];
    if (specialCommands.includes(command)) {
      if (command === "reward") return "add";
      if (command === "punish") return "subtract";
    }
    return false;
  }

  static processCommand(command, prefix) {
    const [commandName, ...args] = command.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    const parameters = [];
    for (let cmd of commands) {
      if (cmd.alias.includes(commandName.toLowerCase())) {
        const special = this.checkSpecialCommand(commandName);
        parameters.push(cmd.object);
        parameters.push(command);
        if (cmd.hasArgs) parameters.push(args);
        if (special) parameters.push(special);
        cmd.execution(...parameters);
      }
    }
  }
}

export default CommandProcessor;
