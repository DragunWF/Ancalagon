import Command from "../utils/command.js";

const _deletedMessage = new WeakMap();
const _originalMessage = new WeakMap();

class SnipeCommand extends Command {
  constructor() {
    super();
    _deletedMessage.set(this, null);
    _originalMessage.set(this, null);
  }

  get deletedMessage() {
    _deletedMessage.get(this);
  }

  set deletedMessage(message) {
    _originalMessage.set(this, message);
  }

  get originalMessage() {
    _originalMessage.get(this);
  }

  set originalMessage(message) {
    _originalMessage.set(this, message);
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
      return { embeds: [embedOutput] };
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
      const embedOutput = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(object.originalMessage.content)
        .setTimestamp()
        .setFooter({ text: "Unedited message" });
      return { embeds: [embedOutput] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

export default SnipeCommand;
