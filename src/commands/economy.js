import Command from "../utils/command.js";
import Economy from "../utils/economy_handler.js";

let data = null;
let dataIndex = null;

class EconomyCommand extends Command {
  constructor() {
    super();
  }

  scavenge(message) {
    Economy.checkUser(message);
    const chance = Math.floor(Math.random() * 20) + 1;
    if (chance === 1) {
      const amount = Math.floor(Math.random() * (150 - 50) + 50);
      Economy.modifyUserCoins(message, amount, "add");
      return `You tried to scavenge but lost **${amount} coins** instead!`;
    } else {
      const amount = Math.floor(Math.random() * (25 - 5) + 5);
      Economy.modifyUserCoins(message, amount, "subtract");
      return `You have successfully scavenged **${amount} coins**!`;
    }
  }

  balance(object, message) {
    Economy.checkUser(message);
    data = Economy.readEconomyData(true);
    console.log(data);
    dataIndex = Economy.getDataIndex(message.author.id);
    const value = data[dataIndex].coins
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setTitle("Coin Balance")
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(`Your Coin Amount: **${value}** 💷`)
      .setFooter({ text: "Dragon's Economy" })
      .setTimestamp();
    return { embeds: [embedOutput] };
  }

  leaderboard(object, message) {
    data = Economy.readEconomyData(true);
    const dataSets = [];
    for (let userData of data)
      dataSets.push({ tag: userData.tag, coins: userData.coins });
    dataSets.sort((a, b) => {
      return a.coins - b.coins;
    });

    const output = "";
    for (let i = 0; i < dataSets.length; i++) {
      output += `**#${i + 1}:** ${dataSets[i].tag} - \`${
        dataSets[i].coins
      } coins\``;
      if (i + 1 >= 10) break;
    }

    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setTitle("Leaderboard in Dragon's Economy")
      .setDescription(output)
      .setFooter({ text: "Richest users in Dragon's Economy" })
      .setTimestamp();
    return { embeds: [embedOutput] };
  }
}

export default EconomyCommand;
