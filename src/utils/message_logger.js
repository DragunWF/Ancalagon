class MessageLogger {
  logMessage(message) {
    console.log("message logged");
  }

  logDeletedMessage(message) {
    console.log("deleted message logged");
  }

  logEditedMessage(before, after) {
    console.log("edited message logged");
  }
}
