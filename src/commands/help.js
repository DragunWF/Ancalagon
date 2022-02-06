const Command = require("../utils/command");

class HelpCommand extends Command {
  constructor() {
    super();
  }

  getCommandList() {
    return "**In Construction**";
  }

  getGameCommandList() {
    return "**In Construction**";
  }

  getMemeCommandList() {
    return "**In Construction**";
  }
}

module.exports = HelpCommand;
