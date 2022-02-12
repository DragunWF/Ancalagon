import fs from "fs";

const fileLocation = "./data/bot/counting.json";

class Counter {
  static readCountData() {
    const jsonData = fs.readFileSync(fileLocation, "utf-8");
    return JSON.parse(jsonData);
  }

  static writeCountData(eventType, index) {
    const jsonData = readCountData();
    const events = {
      restart: 0,
      update: jsonData[index].count + 1,
    };
    switch (eventType) {
      case "restart":
        jsonData[index].count = events[0];
        break;
      case "update":
        jsonData[index].count = events[1];
        break;
    }
    fs.writeFile(fileLocation, JSON.stringify(jsonData, null, 2), (error) => {
      if (error) console.log(error);
    });
  }

  static restartCount() {
    return;
  }

  static updateCount() {
    return;
  }

  static checkChannel(channelId) {
    const jsonData = readCountData();
    for (let dataSet of jsonData)
      if (dataSet.channelId === channelId) return [jsonData.indexOf(dataSet)];
    return false;
  }

  static checkCount(message) {
    const dataIndex = this.checkchannel(message.channel.id);
    if (!dataIndex) return false;
    const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators = ["+", "-", "*", "/", "%"];
    for (let chr of message.content)
      if (!digits.includes(chr) && !operators.includes(chr)) return false;

    const jsonData = this.readCountData();
    const playerNumber = eval(message.content);
    const correctNumber = jsonData[dataIndex].count + 1;
    if (playerNumber === correctNumber) {
      this.writeCountData("update", dataIndex);
      const reactions = ["✅", "☑️"];
      message.react(Math.floor(Math.random() * reactions.length));
    } else {
      this.writeCountData("restart", dataIndex);
      const currentNumber = `**${correctNumber - 1}**`;
      const user = `<@!${message.author.id}>`;
      const responses = [
        `WRONG, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
        `Waw, ${user} ruined it at ${currentNumber}. We're back at the start, next number is **1**.`,
        `Well that's quite unfortunate, next number is **1**. ${user} ruined it at ${currentNumber}.`,
        `Oh well, seems like ${user} ruined it at ${currentNumber}. Next number is **1**.`,
        `Rip, ${user} ruined it at ${currentNumber}. Next number is **1**.`,
      ];
      message.channel.send(
        responses[Math.floor(Math.random() * responses.length)]
      );
      message.react("❌");
    }
  }
}

export default Counter;
