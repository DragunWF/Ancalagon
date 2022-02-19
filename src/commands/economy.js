import Command from "../utils/command.js";
import Economy from "../utils/economy_handler.js";

class EconomyCommand extends Command {
  constructor() {
    super();
    this.data = null;
    this.index = null;
  }

  scavenge(object, message) {
    Economy.checkUser(message);
    const chance = Math.floor(Math.random() * 20) + 1;
    if (chance === 1) {
      const amount = Math.floor(Math.random() * (150 - 50) + 50);
      Economy.modifyUserCoins(message, amount, "subtract");
      return `You tried to scavenge but lost **${amount} coins** instead!`;
    } else {
      const amount = Math.floor(Math.random() * (25 - 5) + 5);
      Economy.modifyUserCoins(message, amount, "add");
      return `You have successfully scavenged **${amount} coins**!`;
    }
  }

  balance(object, message) {
    Economy.checkUser(message);
    object.data = Economy.readEconomyData(true);
    object.index = Economy.getDataIndex(message.author.id);
    const value = object.data[object.index].coins
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.avatarURL(),
      })
      .setDescription(`Coin Balance: **${value}** 💷`)
      .setFooter({ text: "Dragon's Economy" })
      .setTimestamp();
    return { embeds: [embedOutput] };
  }

  leaderboard(object, message) {
    object.data = Economy.readEconomyData(true);
    const dataSets = [];
    for (let userData of object.data)
      dataSets.push({ tag: userData.tag, coins: userData.coins });
    dataSets.sort((a, b) => {
      return a.coins - b.coins;
    });

    let output = "";
    for (let i = 0; i < dataSets.length; i++) {
      output += `**#${i + 1}:** ${dataSets[i].tag} - \`${
        dataSets[i].coins
      } coins\`\n`;
      if (i + 1 >= 10) break;
    }

    const embedOutput = new object.MessageEmbed()
      .setColor(object.getRandomEmbedColor())
      .setTitle("Leaderboard In Dragon's Economy")
      .setDescription(output)
      .setFooter({ text: "Richest users" })
      .setTimestamp();
    return { embeds: [embedOutput] };
  }
}

export default EconomyCommand;
