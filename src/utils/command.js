const { MessageEmbed } = require("discord.js");
const embedMessageColors = [
  "#0F52BA", // Sappire Blue
  "#9b111e", // Ruby Red
  "#50C878", // Emerald Green
  "#faed27", // Yellow
  "#E38C2D", // Orange
  "#A1045A", // Magenta
  "#9966cc", // Purple Amethyst
  "#FFC0CB", // Pink
  "#D5F6FB", // Aqua
  "#9BD087", // Pastel Green
  "#A4D8D8.", // Pastel Cyan
  "#FDFD96", // Pastel Yellow
  "#836953", // Pastel Brown
  "#AEC6CF", // Pastel Blue
  "#C3B1E1", // Pastel Purple
  "#FAC898", // Pastel Orange
  "#f49ac2", // Pastel Magenta
  "#FOB6D5", // Pastel Pink
  "#E39FF6", // Lavender
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
