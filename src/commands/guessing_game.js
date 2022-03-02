import Command from "../utils/command.js";

class GuessingGame {
  constructor(id) {
    this.id = id;
    this.correctNumber = Math.floor(Math.random() * 100) + 1;
  }

  checkNumber(number) {
    if (number < this.correctNumber) {
      return;
    }
    if (number > this.correctNumber) {
      return;
    }
    if (number == this.correctNumber) {
    }
  }
}

class GuessCommand extends Command {
  constructor() {
    super();
    this.games = [];
  }

  startGuessingGame(id) {
    if (this.games) for (let game of games) if (game.id === id) return false;
    this.games.push(new GuessingGame(id));
  }

  processCommand(object, message) {
    if (object.startGuessingGame(message.author.id)) {
      const embed = new object.MessageEmbed();
      message.reply({ embeds: [embed] });
    } else {
      message.channel.send("You already in a game! Type $end to end it.");
    }
  }
}

export default GuessCommand;
