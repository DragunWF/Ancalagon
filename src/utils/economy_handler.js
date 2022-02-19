import fs from "fs";
import chalk from "chalk";

const fileLocation = "./data/bot/economy.json";
let data = null;
let index = null;

class Economy {
  static readEconomyData(external = false) {
    const jsonData = JSON.parse(fs.readFileSync(fileLocation, "utf8"));
    data = jsonData;
    if (external) {
      return jsonData;
    }
  }

  static writeEconomyData() {
    fs.writeFileSync(fileLocation, JSON.stringify(data, null, 2));
  }

  static getDataIndex(id) {
    for (let dataSet of data)
      if (dataSet.id === id) return data.indexOf(dataSet);
    return false;
  }

  static modifyUserCoins(user, amount, type) {
    this.readEconomyData();
    this.checkUser(user);
    data[index].coins += type === "add" ? amount : -amount;
    console.log(data[index].coins);
    if (data[index].coins < 0) data[index].coins = 0;
    this.writeEconomyData();
  }

  static registerUser(message) {
    const userData = {
      tag: message.author.tag,
      id: message.author.id,
      level: 0,
      coins: 0,
    };
    data.push(userData);
    this.writeEconomyData();
    console.log(
      chalk.bold.underline.greenBright(
        `${message.author.tag} has been registered!`
      )
    );
  }

  static checkTagChange(authorTag) {
    if (data[index].tag !== authorTag) {
      data[index].tag = authorTag;
      this.writeEconomyData();
    }
  }

  static checkUser(message) {
    this.readEconomyData();
    for (let userData of data) {
      if (userData.id === message.author.id) {
        index = data.indexOf(userData);
        this.checkTagChange(message.author.tag);
        return;
      }
    }
    this.registerUser(message);
  }
}

export default Economy;
