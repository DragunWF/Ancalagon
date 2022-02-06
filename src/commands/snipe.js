const Command = require("../utils/command");

class MessageSniper extends Command {
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

  snipeDeletedMessage(reference) {
    const responses = [
      "There are no messages to snipe!",
      "Unfortunately, there's no message to snipe.",
      "Better luck next time, no message to snipe.",
      "Well that's quite disappointing, there's no message to snipe.",
      "Sadly, there's no message to snipe...",
    ];
    if (reference.deletedMessage) {
      const user = reference.deletedMessage.author;
      const embed = new reference.messageEmbed()
        .setColor(reference.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(reference.deletedMessage.content)
        .setTimestamp()
        .setFooter({ text: "Deleted message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }

  snipeEditedMessage(reference) {
    const responses = [
      "No edited message to snipe sadly.",
      "There are no edited messages to snipe!",
      "No message to esnipe.",
      "Most unfortunate, there's no message to esnipe!",
      "Seems like there's no edited message to snipe.",
    ];
    if (reference.originalMessage) {
      const user = reference.originalMessage.author;
      const embed = new reference.messageEmbed()
        .setColor(reference.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(reference.originalMessage.content)
        .setTimestamp()
        .setFooter({ text: "Unedited message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

module.exports = MessageSniper;
