const express = require("express");

const server = express();

server.all("/", (request, response) => {
  response("Ancalagon has now been awakened!");
});

function keepServerRunning() {
  server.listen(3000, () => {
    console.log("The server is now ready!");
  });
}

module.exports = keepServerRunning;
