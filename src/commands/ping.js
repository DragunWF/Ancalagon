const Command = require("../utils/command");

class PingCommand extends Command {
  constructor() {
    super();
  }

  getBotLatency(self, message) {
    const ping = Math.abs(Date.now() - message.createdTimestamp);
    const embedOutput = new self.messageEmbed()
      .setColor(self.getRandomEmbedColor())
      .setAuthor({
        name: "Pong!",
      })
      .setDescription(`Ping: **${ping}ms** :ping_pong:`);
    return { embeds: [embedOutput] };
  }
}

module.exports = PingCommand;
