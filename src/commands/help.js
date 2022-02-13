import Command from "../utils/command.js";

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
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("Command Categories :ringed_planet:")
      .setDescription(this.concatenateCommands(commands, true, "help"));
    return { embeds: [embedOutput] };
  }

  getGeneralCommandList() {
    const commands = ["info", "ping", "inspire", "snipe", "esnipe"];
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("General Command List :tools:")
      .setDescription(this.concatenateCommands(commands, false));
    return { embeds: [embedOutput] };
  }

  getGameCommandList() {
    return "Only command here is `$setup counting`. More will be added in the future";
  }

  getMemeCommandList() {
    return "**In Construction**";
  }

  getEconomyCommandList() {
    return "**In Construction**";
  }

  processHelpCommand(object, args) {
    switch (args[0]) {
      case "general":
        return object.getGeneralCommandList();
      case "economy":
        return object.getEconomyCommandList();
      case "game":
      case "games":
        return object.getGameCommandList();
      case "meme":
      case "memes":
        return object.getMemeCommandList();
    }
    return object.getHelpCommandList();
  }
}

export default HelpCommand;
