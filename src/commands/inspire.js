const fetch = require("node-fetch");
const Command = require("../utils/command");

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
      .setAuthor({ name: `${data[0]["a"]}`, url: "https://zenquotes.io/" })
      .setDescription(`"${data[0]["q"]}"`)
      .setFooter({ text: "zenquotes.io" });
    message.channel.send({ embeds: [embedOutput] });
  }
}

module.exports = InspireCommand;
