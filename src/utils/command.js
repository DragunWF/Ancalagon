const { MessageEmbed } = require("discord.js");

class Command {
  constructor() {
    this.messageEmbed = MessageEmbed;
    this.embedColors = [
      "#0F52BA", // Blue
      "#9b111e", // Red
      "#50C878", // Green
      "#faed27", // Yellow
      "#E38C2D", // Orange
      "#A1045A", // Magneta
      "#9966cc", // Amethyst (Purple)
      "#FFC0CB", // Pink
      "#D5F6FB", // Aqua
      "#9BD087", // Pastel Green
      "#0000FF", // Cyan
    ];
  }

  getRandomEmbedColor() {
    return this.embedColors[
      Math.floor(Math.random() * this.embedColors.length)
    ];
  }
}

module.exports = Command;
