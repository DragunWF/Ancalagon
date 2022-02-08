const { MessageEmbed } = require("discord.js");
const embedMessageColors = [
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

class Command {
  constructor() {
    this.MessageEmbed = MessageEmbed;
  }

  getRandomEmbedColor() {
    return embedMessageColors[
      Math.floor(Math.random() * embedMessageColors.length)
    ];
  }
}

module.exports = Command;
