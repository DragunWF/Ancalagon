import Command from "../utils/command.js";

class GuessingGame {
  constructor(id) {
    this.id = id;
    this.correctNumber = Math.floor(Math.random() * 100) + 1;
    this.retries = 0;
  }

  checkNumber(message, number) {
    if (number > 100 || number <= 0) {
      message.channel.send("Number must be from 1 to 100!");
    } else {
      if (number < this.correctNumber) {
        if (this.correctNumber - number <= 3)
          message.channel.send("A tiny bit low.");
        else message.channel.send("Too low!");
        return false;
      }

      if (number > this.correctNumber) {
        if (this.correctNumber - number <= 3)
          message.channel.send("A tiny bit high.");
        else message.channel.send("Too high!");
        return false;
      }

      if (number == this.correctNumber) {
        const embed = new this.MessageEmbed()
          .setColor(this.getRandomEmbedColor())
          .setTitle("End Result Stats")
          .setDescription(
            `\`Retries:\` ${this.retries} 
            ${
              this.retries == 0
                ? "Congrats, you have guessed the correct number!"
                : "You are blessed by the RNG gods!"
            }`
          )
          .setFooter({ text: "Thanks for playing!" })
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
        return true;
      }
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
    return true;
  }

  processCommand(object, message) {
    if (object.startGuessingGame(message.author.id)) {
      const embed = new object.MessageEmbed()
        .setColor(object.getRandomEmbedColor())
        .setTitle("Guessing Game Initialized")
        .setDescription(
          "Welcome to a game where you try to guess the correct number from 1 to 100! " +
            "Don't worry, you have unlimited guesses and you're provided with hints with " +
            "every wrong guess."
        )
        .setFooter({ text: "Have fun!" })
        .setTimestamp();
      message.reply({ embeds: [embed] });
    } else {
      message.channel.send("You already in a game! Type $end to end it.");
    }
  }
}

export default GuessCommand;
