const fetch = require("node-fetch");
const Command = require("../utils/command");

class InspireCommand extends Command {
  constructor() {
    super();
  }

  fetchQuoteData() {
    return fetch("https://zenquotes.io/api/random").then((result) => {
      return result.json();
    });
  }

  sendQuoteData(object) {
    const data = object.fetchQuoteData();
    const embedOutput = new object.messageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setAuthor({ name: `From ${data[0]["a"]}`, url: "https://zenquotes.io/" })
      .setDescription(`*"${data[0]["q"]}"*`)
      .setFooter({ text: "From `zenquotes.io`" });
    return { embeds: [embedOutput] };
  }
}

module.exports = InspireCommand;
