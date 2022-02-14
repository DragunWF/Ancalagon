import fs from "fs";
import Economy from "./economy_handler.js";

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

  static writeCountData(eventType, userId) {
    const events = {
      restart: [0, null],
      update: [jsonData[dataIndex].count + 1, userId],
    };
    jsonData[dataIndex].count = events[eventType][0];
    jsonData[dataIndex].lastUserId = events[eventType][1];
    fs.writeFile(fileLocation, JSON.stringify(jsonData, null, 2), (error) => {
      if (error) console.log(error);
    });
  }

  static onRestartCount(message, sameUser) {
    const currentNumber = `**${jsonData[dataIndex].count}**`;
    const user = `<@!${message.author.id}>`;
    const responses = [
      [
        `WRONG, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
        `Waw, ${user} ruined it at ${currentNumber}. We're back at the start, next number is **1**.`,
        `Well that's quite unfortunate, next number is **1**. ${user} ruined it at ${currentNumber}.`,
        `Oh well, seems like ${user} ruined it at ${currentNumber}. Next number is **1**.`,
        `Rip, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
      ],
      [
        `Disappointing, ${user} ruined it at ${currentNumber}. The **same user can't count twice!**. Next number is **1**.`,
        `Heh, the **same user can't count twice!** ${user} ruined it at ${currentNumber}. Next number is **1**.`,
        `Well that's not the right way to do it. The **same user can't count twice**. ${user} ruined it at ${currentNumber}. Next number is **1**.`,
      ],
    ];
    const reactions = ["❌", "🤡", "💀", "💩", "👺"];
    message.react(reactions[Math.floor(Math.random() * reactions.length)]);
    message.channel.send(
      responses[!sameUser ? 0 : 1][Math.floor(Math.random() * responses.length)]
    );
  }

  static onUpdateCount(message, number) {
    if (number % 100 === 0) message.react("🎉");
    else {
      const reactions = ["✅", "☑️"];
      message.react(reactions[number % 2 === 0 ? 0 : 1]);
    }
  }

  static checkCount(message) {
    this.setCountData(message);
    if (!dataIndex) return false;
    const countable = "0123456789+-*/%().".split("");
    const playerMessage = message.content.split(" ").join("");
    for (let chr of playerMessage) if (!countable.includes(chr)) return false;

    const playerNumber = eval(playerMessage);
    const correctNumber = jsonData[dataIndex].count + 1;
    const lastUser = jsonData[dataIndex].lastUserId;
    if (playerNumber === correctNumber && message.author.id !== lastUser) {
      this.onUpdateCount(message, correctNumber);
      this.writeCountData("update", message.author.id);
    } else {
      this.onRestartCount(message, message.author.id === lastUser);
      this.writeCountData("restart");
    }
  }
}

export default Counter;
