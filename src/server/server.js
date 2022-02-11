import express from "express";

const server = express();

server.all("/", (request, response) => {
  response.sendFile("page.html");
});

function keepServerRunning() {
  server.listen(3000, () => {
    console.log("The server is now ready!");
  });
}

export default keepServerRunning;
