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
    const commands = ["info", "ping", "inspire", "crypto", "snipe", "esnipe"];
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("General Command List 🛠️")
      .setDescription(this.concatenateCommands(commands, false));
    return { embeds: [embedOutput] };
  }

  getGameCommandList() {
    const commands = ["guess `- Initializes Guess the Number game`"];
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("Game Command List 🎲")
      .setDescription(this.concatenateCommands(commands, false));
    return { embeds: [embedOutput] };
  }

  getMemeCommandList() {
    return "**In Construction**";
  }

  getEconomyCommandList() {
    const commands = ["bal", "scavenge", "leaderboard"];
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("Economy Command List 💰")
      .setDescription(this.concatenateCommands(commands, false));
    return { embeds: [embedOutput] };
  }

  processHelpCommand(object, message, args) {
    let commandList = null;
    if (args[0] === "general" || args[0] === "gen")
      commandList = object.getGeneralCommandList();
    else if (args[0] === "economy" || args[0] === "eco")
      commandList = object.getEconomyCommandList();
    else if (args[0] === "games" || args[0] === "game")
      commandList = object.getGamesCommandList();
    else if (args[0] === "memes" || args[0] === "meme")
      commandList = object.getMemeCommandList();
    else commandList = object.getHelpCommandList();

    message.channel.send(commandList);
  }
}

export default HelpCommand;
