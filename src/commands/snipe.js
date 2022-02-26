import Command from "../utils/command.js";

class SnipeCommand extends Command {
  constructor() {
    super();
    this.deletedMessage = null;
    this.originalMessage = null;
  }

  storeDeletedMessage(message) {
    if (message.content.length > 1) {
      this.deletedMessage = message;
    }
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
      const embedOutput = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(object.deletedMessage.content)
        .setTimestamp()
        .setFooter({ text: "Deleted message" });
      message.channel.send({ embeds: [embedOutput] });
    }
    message.channel.send(
      responses[Math.floor(Math.random() * responses.length)]
    );
  }

  snipeEditedMessage(object, message) {
    const responses = [
      "No edited message to snipe sadly.",
      "There are no edited messages to snipe!",
      "No message to esnipe.",
      "Most unfortunate, there's no message to esnipe!",
      "Seems like there's no edited message to snipe.",
    ];
    if (object.originalMessage) {
      const user = object.originalMessage.author;
      const embedOutput = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(object.originalMessage.content)
        .setTimestamp()
        .setFooter({ text: "Unedited message" });
      message.channel.send({ embeds: [embedOutput] });
    }
    message.channel.send(
      responses[Math.floor(Math.random() * responses.length)]
    );
  }
}

export default SnipeCommand;
