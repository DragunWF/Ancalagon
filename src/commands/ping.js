const Command = require("../utils/command");

class PingCommand extends Command {
  constructor() {
    super();
  }

  getBotLatency(self) {
    return;
  }
}

module.exports = PingCommand;
