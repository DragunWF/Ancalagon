class CommandProcessor {
  processCommand(command) {
    this.commands = [
      ["help", undefined],
      ["snipe", undefined],
      ["esnipe", undefined],
    ];
  }
}

module.exports = CommandProcessor;
