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
    message.channel.send({ embeds: [embedOutput] });
  }

  rulerModify(object, message, args, type) {
    if (message.author.id !== "408972598798450688") {
      message.channel.send(
        "Only **DragonWF** himself can execute this command... nerd"
      );
      return;
    }
    if (args.length < 2) {
      message.channel.send("You forgot to add an argument");
      return;
    }

    Economy.checkUser(args[0]);
    object.data = Economy.readEconomyData(true);

    const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    let userId = [];
    for (let chr of args[0])
      for (let digit of digits) if (chr == digit) userId.push(digit);
    userId = userId.join("");

    Economy.modifyUserCoins(message, userId, type);
    const amount = args[1]
      .toFixed(2)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const response = [
      `Congrats <@!${userId}>, you have been rewarded with **${amount} coins** by the great great DragonWF.`,
      `Waw <@!${userId}>, seems like you were punished by the great DragonWF and lost **${amount} coins!**`,
    ];
    message.channel.send(type === "add" ? response[0] : response[1]);
  }
}

export default EconomyCommand;
