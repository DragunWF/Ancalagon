const Command = require("../utils/command");

class HelpCommand extends Command {
  constructor() {
    super();
  }

  concatenateCommands(array, hasArgs, initial = null) {
    let output = "";
    for (let item of array) {
      if (hasArgs) output += `- \`$${initial} ${item}\`\n`;
      else output += `- \`$${item}\`\n`;
    }
    return output;
  }

  getHelpCommandList() {
    const commands = ["general", "games", "memes", "economy"];
    const embedOutput = new this.messageEmbed()
      .setColor(this.getRandomEmbedColor())
      .setTitle("Command Categories :ringed_planet:")
      .setDescription(this.concatenateCommands(commands, true, "help"));
    return { embeds: [embedOutput] };
  }

  getGeneralCommandList() {
    const commands = ["info", "snipe", "esnipe"];
    const embedOutput = new this.messageEmbed()
      .setColor(this.getRandomEmbedColor())
      .setTitle("General Command List :tools:")
      .setDescription(this.concatenateCommands(commands, false));
    return { embeds: [embedOutput] };
  }

  getGameCommandList() {
    return "**In Construction**";
  }

  getMemeCommandList() {
    return "**In Construction**";
  }

  getEconomyCommandList() {
    return "**In Construction**";
  }

  processHelpCommand(self, args) {
    switch (args[0]) {
      case "general":
        return self.getGeneralCommandList();
      case "economy":
        return self.getEconomyCommandList();
      case "game":
      case "games":
        return self.getGameCommandList();
      case "meme":
      case "memes":
        return self.getMemeCommandList();
    }
    return self.getHelpCommandList();
  }
}

module.exports = HelpCommand;
