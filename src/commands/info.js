const Command = require("../utils/command");

const description = `
Hello! This is a bot written in JavaScript by \`DragonWF#9321\`.

At the moment, **this bot is in development** and is still being worked on to be added more features.

I plan on adding an economy feature that integrates itself with my previous bot's economy feature (DragonBot). So for people who are worrying that their gold might reset to zero, well worry no more since I'll just be transfering your gold to this bot's economy.

As for now this will have to do.
`;

class InfoCommand extends Command {
  constructor() {
    super();
  }

  getBotInformation(object) {
    const embedOutput = new object.MessageEmbed()
      .setColor("#9966cc")
      .setAuthor({
        name: "DragonWF#9321",
        iconURL:
          "https://cdn.discordapp.com/avatars/408972598798450688/617053b744713e4a211c1e119ec46ab4.webp",
        url: "https://dragonwf.netlify.app/",
      })
      .setTitle("Bot Information")
      .setDescription(description)
      .setImage(
        "https://cdn.discordapp.com/avatars/939435166034722827/73ead4510886bc2ecfd08b7147b07d17.webp"
      )
      .setFooter({ text: "Have a nice day!" });
    return { embeds: [embedOutput] };
  }
}

module.exports = InfoCommand;
