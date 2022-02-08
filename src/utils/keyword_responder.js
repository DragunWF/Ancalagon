const fs = require("fs");

const keywords = JSON.parse(fs.readFileSync("./data/bot/keywords.json"));

class KeyWordResponder {
  static incrementTimesMentioned(data) {
    keywords[keywords.indexOf(data)]["timesMentioned"]++;
  }

  static pickRandomResponse(data) {
    return data["responses"][Math.floor(Math.random() * keywords.length)];
  }

  static checkMessage(message) {
    for (let data of keywords) {
      if (data["keywords"].includes(message)) {
        if (data["timesMentioned"] % data["timesToExecute"] === 0) {
          this.incrementTimesMentioned(data);
          return this.pickRandomResponse(data);
        } else this.incrementTimesMentioned(data);
      }
    }
    return false;
  }
}

module.exports = KeyWordResponder;
