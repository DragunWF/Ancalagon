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
      message.channel.send(
        `You tried to scavenge but lost **${amount} coins** instead!`
      );
    } else {
      const amount = Math.floor(Math.random() * (25 - 5) + 5);
      Economy.modifyUserCoins(message, amount, "add");
      message.channel.send(
        `You have successfully scavenged **${amount} coins**!`
      );
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
      return b.coins - a.coins;
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
    message.channel.send({ embeds: [embedOutput] });
  }

  rulerModify(object, message, args, type) {
    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
    let userId = [];
    for (let chr of args[0]) if (digits.includes(chr)) userId.push(chr);
    userId = userId.join("");

    for (let chr of args[1].split("")) {
      if (!digits.includes(chr)) {
        message.channel.send("The amount must be an integer");
        return;
      }
    }

    if (message.author.id !== "408972598798450688") {
      message.channel.send(
        "Only **DragonWF** himself can execute this command... nerd"
      );
    } else if (args.length < 2) {
      message.channel.send("You forgot to add an argument");
    } else if (typeof Economy.getDataIndex(userId) !== "number") {
      message.channel.send("The player you're targeting isn't registered");
    } else {
      object.data = Economy.readEconomyData(true);

      Economy.modifyUserCoins(message, Number(args[1]), type);
      const amount = args[1].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      const response = [
        `Congrats <@!${userId}>, you have been rewarded with **${amount} coins** by the great great DragonWF.`,
        `Waw <@!${userId}>, seems like you were punished by the great DragonWF and lost **${amount} coins!**`,
      ];
      message.channel.send(type === "add" ? response[0] : response[1]);
    }
  }
}

export default EconomyCommand;
