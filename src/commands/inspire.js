import fetch from "node-fetch";
import Command from "../utils/command.js";

class InspireCommand extends Command {
  constructor() {
    super();
  }

  async fetchQuoteData() {
    const response = await fetch("https://zenquotes.io/api/random");
    const data = await response.json();
    return data;
  }

  async sendQuoteData(object, message) {
    const data = await object.fetchQuoteData();
    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setAuthor({ name: `${data[0]["a"]}` })
      .setDescription(`"${data[0]["q"]}"`)
      .setFooter({ text: "zenquotes.io" });
    message.channel.send({ embeds: [embedOutput] });
  }
}

export default InspireCommand;
