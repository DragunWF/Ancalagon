import fs from "fs";

const fileLocation = "./data/bot/counting.json";
let jsonData = null;
let dataIndex = null;

class Counter {
  static readCountData() {
    const data = fs.readFileSync(fileLocation, "utf-8");
    return JSON.parse(data);
  }

  static getDataIndex(guildId, channelId) {
    for (let dataSet of jsonData)
      if (dataSet.guildId === guildId && dataSet.channelId === channelId)
        return jsonData.indexOf(dataSet);
    return null;
  }

  static setCountData(message) {
    jsonData = this.readCountData();
    dataIndex = this.getDataIndex(message.guild.id, message.channel.id);
  }

  static writeCountData(eventType) {
    const events = {
      restart: 0,
      update: jsonData[dataIndex].count + 1,
    };
    jsonData[dataIndex].count = events[eventType];
    fs.writeFile(fileLocation, JSON.stringify(jsonData, null, 2), (error) => {
      if (error) console.log(error);
    });
  }

  static onRestartCount(message) {
    const currentNumber = `**${jsonData[dataIndex].count}**`;
    const user = `<@!${message.author.id}>`;
    const responses = [
      `WRONG, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
      `Waw, ${user} ruined it at ${currentNumber}. We're back at the start, next number is **1**.`,
      `Well that's quite unfortunate, next number is **1**. ${user} ruined it at ${currentNumber}.`,
      `Oh well, seems like ${user} ruined it at ${currentNumber}. Next number is **1**.`,
      `Rip, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
    ];
    const reactions = ["❌", "🤡", "💀", "💩", "👺"];
    message.react(reactions[Math.floor(Math.random() * reactions.length)]);
    message.channel.send(
      responses[Math.floor(Math.random() * responses.length)]
    );
  }

  static onUpdateCount(message, number) {
    if (number % 100 === 0) message.react("🎉");
    else {
      const reactions = ["✅", "☑️"];
      message.react(reactions[Math.floor(Math.random() * reactions.length)]);
    }
  }

  static checkCount(message) {
    this.setCountData(message);
    if (!dataIndex) return false;
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators = ["+", "-", "*", "/", "%"];
    for (let chr of message.content.split(" ").join())
      if (!digits.includes(chr) && !operators.includes(chr)) return false;

    const playerNumber = eval(message.content);
    const correctNumber = jsonData[dataIndex].count + 1;
    if (playerNumber === correctNumber) {
      this.onUpdateCount(message, correctNumber);
      this.writeCountData("update");
    } else {
      this.onRestartCount(message);
      this.writeCountData("restart");
    }
  }
}

export default Counter;
