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

  snipeDeletedMessage() {
    const responses = [
      "There are no messages to snipe!",
      "Unfortunately, there's no message to snipe.",
      "Better luck next time, no message to snipe.",
      "Well that's quite disappointing, there's no message to snipe.",
      "Sadly, there's no message to snipe...",
    ];
    if (this.deletedMessage) return this.deletedMessage;
    return responses[Math.floor(Math.random() * responses.length)];
  }

  snipeEditedMessage() {
    const responses = [
      "No edited message to snipe sadly.",
      "There are no edited messages to snipe!",
      "No message to esnipe.",
      "Most unfortunate, there's no message to esnipe!",
      "Seems like there's no edited message to snipe.",
    ];
    if (this.originalMessage) return this.originalMessage;
    return responses[Math.floor(Math.random() * responses.length)];
  }
}

module.exports = MessageSniper;
