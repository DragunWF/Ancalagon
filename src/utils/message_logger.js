const fs = require("fs");

class MessageLogger {
  static logCreatedMessage(content, author) {
    const log = `[${author}]: ${content}`;
    console.log(log);
    fs.appendFile("./data/logs/chat_logs.txt", `${log}\n`, (error) => {
      if (error) console.log(error);
    });
  }

  static logDeletedMessage(content, author) {
    const log = `Deleted Message:\n[${author}]: ${content}`;
    console.log(log);
    fs.appendFile("./data/logs/deleted_logs.txt", `${log}\n`, (error) => {
      if (error) console.log(error);
    });
  }

  static logEditedMessage(before, after, author) {
    const log = `Message Edit Event: (By: ${author})
Before: ${before}
After: ${after}`;
    console.log(log);
    fs.appendFile("./data/logs/edited_logs.txt", `${log}\n`, (error) => {
      if (error) console.log(error);
    });
  }
}

module.exports = MessageLogger;
