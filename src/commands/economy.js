import Command from "../utils/command";
import Economy from "../utils/economy_handler";

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
    dataIndex = Economy.getDataIndex(message.author.id);
    const value = data[dataIndex].coins
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
      .setFooter({ text: "Dragon's Economy" });
    return { embeds: [embedOutput] };
  }

  leaderboard(object, message) {
    Economy.readEconomyData(true);
    // Add more code here
  }
}

export default EconomyCommand;
