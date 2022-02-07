const dragonResponses = [
  "I see that you have a mention of a dragon there...",
  "HmMmmmMm, I see that",
  "That's gotta be a V right there",
  "Lel",
];
const jackboxResponses = [];
const ancalagonResponses = [];

class KeyWordResponder {
  keywords = [
    ["dragon", dragonResponses, 5, 0],
    ["jackbox", jackboxResponses, 2, 0],
    ["ancalagon", ancalagonResponses, 1, 0],
    ["waw", "Waw"],
  ];
  static checkMessage(message) {
    for (let data of keywords) {
      if (message.toLowerCase().includes(data[0])) {
        if (!Array.isArray(data[1])) return data[1];
        if (data[2] % data[3] === 0) {
          return data[1][Math.floor(Math.random() * data[1].length)];
        } else this.keywords[this.keywords.indexOf[data]][3]++;
      }
    }
    return false;
  }
}

module.exports = KeyWordResponder;
