import fs from "fs";
import chalk from "chalk";

const fileLocation = "./data/bot/economy.json";
let data = null;
let dataIndex = null;

class Economy {
  static readEconomyData(external = false) {
    const jsonData = fs.readFileSync(fileLocation, "utf8");
    data = JSON.parse(jsonData);
    if (external) return data;
  }

  static writeEconomyData() {
    fs.writeFile(fileLocation, JSON.stringify(data, null, 2), (error) => {
      if (error) console.log(error);
    });
  }

  static getDataIndex(id) {
    for (let dataSet of data)
      if (dataSet.id === id) return data.indexOf(dataSet);
    return false;
  }

  static modifyUserCoins(user, amount, type) {
    this.checkUser(user);
    data[dataIndex].coins += type === "add" ? amount : -amount;
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
    if (data[dataIndex].tag !== authorTag) {
      data[dataIndex].tag = authorTag;
      this.writeEconomyData();
      this.readEconomyData();
    }
  }

  static checkUser(message) {
    this.readEconomyData();
    for (let userData of data) {
      if (userData.id === message.author.id) {
        dataIndex = data.indexOf(userData);
        this.checkTagChange(message.author.tag);
        return;
      }
    }
    this.registerUser(message);
    this.checkUser(message);
  }
}

export default Economy;
