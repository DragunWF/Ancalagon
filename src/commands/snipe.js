class MessageSniper {
  constructor() {
    this.originalMessage = undefined;
    this.deletedMessage = undefined;
  }

  storeDeletedMessage(message) {
    this.deletedMessage = message;
  }

  storeOriginalMessage(message) {
    this.originalMessage = message;
  }

  snipeDeletedMessage(Discord) {
    const responses = [
      "There are no messages to snipe!",
      "Unfortunately, there's no message to snipe.",
      "Better luck next time, no message to snipe.",
      "Well that's quite disappointing, there's no message to snipe.",
      "Sadly, there's no message to snipe...",
    ];
    if (this.deletedMessage) {
      const user = this.deletedMessage.author;
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(this.deletedMessage.content)
        .setTimestamp()
        .setFooter({ text: "Deleted message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }

  snipeEditedMessage(Discord) {
    const responses = [
      "No edited message to snipe sadly.",
      "There are no edited messages to snipe!",
      "No message to esnipe.",
      "Most unfortunate, there's no message to esnipe!",
      "Seems like there's no edited message to snipe.",
    ];
    if (this.originalMessage) {
      const user = this.originalMessage.author;
      const embed = new Discord.MessageEmbed()
        .setAuthor({
          name: String(user.tag),
          iconURL: user.avatarURL(),
        })
        .setDescription(this.originalMessage.content)
        .setTimestamp()
        .setFooter({ text: "Unedited message" });
      return { embeds: [embed] };
    }
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

module.exports = MessageSniper;
