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

  async sendQuoteData(object) {
    const data = await object.fetchQuoteData();
    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setAuthor({ name: `By ${data[0]["a"]}`, url: "https://zenquotes.io/" })
      .setDescription(`*"${data[0]["q"]}"*`)
      .setFooter({ text: "From `zenquotes.io`" });
    return { embeds: [embedOutput] };
  }
}

module.exports = InspireCommand;
