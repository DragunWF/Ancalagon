const Command = require("../utils/command");

class InfoCommand extends Command {
  constructor() {
    super();
  }

  getBotInformation() {
    const embed = new this.messageEmbed();
    return { embeds: [embed] };
  }
}

module.exports = InfoCommand;
