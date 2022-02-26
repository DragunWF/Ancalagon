import fs from "fs";
import Command from "../utils/command.js";

class SetupCommand extends Command {
  constructor() {
    super();
  }

  checkData(guildId) {
    const jsonData = fs.readFileSync("./data/bot/counting.json", "utf-8");
    for (let dataSet of JSON.parse(jsonData))
      if (dataSet.guildId === guildId) return true;
    return false;
  }

  writeOnData(message, type) {
    const writingTypes = {
      counting: [
        "./data/bot/counting.json",
        {
          guildId: message.guild.id,
          channelId: message.channel.id,
          lastUserId: null,
          count: 0,
        },
      ],
    };

    fs.readFile(writingTypes[type][0], "utf-8", (error, jsonString) => {
      if (error) console.log(error);
      else {
        try {
          const jsonData = JSON.parse(jsonString);
          jsonData.push(writingTypes[type][1]);
          fs.writeFile(
            writingTypes[type][0],
            JSON.stringify(jsonData, null, 2),
            (error) => {
              if (error) console.log(error);
            }
          );
        } catch (error) {
          console.log(`Error parsing JSON data: ${error}`);
        }
      }
    });
  }

  setupCounting(message) {
    if (this.checkData(message.guild.id))
      return "Counting Channel already set up in this guild";
    this.writeOnData(message, "counting");
    const embedOutput = new this.MessageEmbed()
      .setColor(this.mainColor)
      .setTitle("Counter Initialized")
      .setDescription(
        "Counting channel has been set up in this guild successfully"
      )
      .setFooter({ text: "Have fun!" });
    return { embeds: [embedOutput] };
  }

  processSetupCommand(object, message, args) {
    if (args[0] === "counting" || args[0] === "count")
      return object.setupCounting(message);
    return false;
  }
}

export default SetupCommand;
