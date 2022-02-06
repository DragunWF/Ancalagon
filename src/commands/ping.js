const Command = require("../utils/command");

class PingCommand extends Command {
  constructor() {
    super();
  }

  getBotLatency(self, message) {
    let embedOutput = new self.messageEmbed()
      .setColor(self.getRandomEmbedColor())
      .setAuthor({
        name: "Pong!",
      });
    const responses = [
      "Calculating ping...",
      "Calculating latency...",
      "Calculating speed...",
    ];
    const response = responses[Math.floor(Math.random() * responses.length)];
    message.reply(response).then((result) => {
      const ping = result.createdTimestamp - message.createdTimestamp;
      embedOutput = embedOutput.setDescription(
        `Ping: **${ping}ms** :ping_pong:`
      );
    });
    return { embeds: [embedOutput] };
  }
}

module.exports = PingCommand;
