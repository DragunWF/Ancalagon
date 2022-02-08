const Command = require("../utils/command");

class SnipeCommand extends Command {
  constructor() {
    super();
    this.originalMessage = null;
    this.deletedMessage = null;
  }

  storeDeletedMessage(message) {
    this.deletedMessage = message;
  }

  storeOriginalMessage(message) {
    this.originalMessage = message;
  }

  snipeDeletedMessage(object) {
    const responses = [
      "There are no messages to snipe!",
      "Unfortunately, there's no message to snipe.",
      "Better luck next time, no message to snipe.",
      "Well that's quite disappointing, there's no message to snipe.",
      "Sadly, there's no message to snipe...",
    ];
    if (object.deletedMessage) {
      const user = object.deletedMessage.author;
      const embed = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(object.deletedMessage.content)
        .setTimestamp()
        .setFooter({ text: "Deleted message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }

  snipeEditedMessage(object) {
    const responses = [
      "No edited message to snipe sadly.",
      "There are no edited messages to snipe!",
      "No message to esnipe.",
      "Most unfortunate, there's no message to esnipe!",
      "Seems like there's no edited message to snipe.",
    ];
    if (object.originalMessage) {
      const user = object.originalMessage.author;
      const embed = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(object.originalMessage.content)
        .setTimestamp()
        .setFooter({ text: "Unedited message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

module.exports = SnipeCommand;
