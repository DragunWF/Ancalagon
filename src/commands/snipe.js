class MessageSniper {
  constructor() {
    this.originalMessage = undefined;
    this.editedMessage = undefined;
    this.deletedMessage = undefined;
  }

  storeDeletedMessage(message) {
    this.deletedMessage = message;
  }

  storeEditedMessage(message) {
    this.editedMessage = message;
  }

  storeOriginalMessage(message) {
    this.originalMessage = message;
  }
}

module.exports = MessageSniper;
