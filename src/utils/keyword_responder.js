const fs = require("fs");

const keywords = JSON.parse(fs.readFileSync("./data/bot/keywords.json"));

class KeyWordResponder {
  static incrementTimesMentioned(data) {
    keywords[keywords.indexOf(data)].timesMentioned++;
  }

  static pickRandomResponse(data) {
    return data.responses[Math.floor(Math.random() * data.responses.length)];
  }

  static containsKeyword(string, data) {
    string = string.toLowerCase().split(" ");
    if (Array.isArray(data.keyword)) {
      for (let word of string)
        for (let keyword of data.keyword) 
          if (word === keyword) return true;
    } else if (string.includes(data.keyword)) return true;
    return false;
  }

  static checkMessage(message) {
    for (let data of keywords) {
      if (this.containsKeyword(message, data)) {
        if (data.timesMentioned % data.timesToExecute === 0) {
          this.incrementTimesMentioned(data);
          return this.pickRandomResponse(data);
        } else this.incrementTimesMentioned(data);
      }
    }
    return false;
  }
}

module.exports = KeyWordResponder;
