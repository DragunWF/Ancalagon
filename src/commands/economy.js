import Command from "../utils/command";
import Economy from "../utils/economy_handler";

const fileLocation = "./data/bot/economy.json";
let data = null;

class EconomyCommand extends Command {
  constructor() {
    super();
  }

  readEconomyData() {
    const jsonData = fs.readFileSync(fileLocation, "utf8");
    data = JSON.parse(jsonData);
  }

  scavenge(message) {
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

  balance(message) {
    return;
  }

  leaderboard(message) {
    return;
  }
}

export default EconomyCommand;
