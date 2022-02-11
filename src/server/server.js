import express from "express";
import path from "path";

const server = express();
const __dirname = path.resolve();

server.use(express.static(path.join(__dirname, "src/server")));
server.all("/", (request, response) => {
  response.sendFile(path.join(__dirname, "src/server/page.html"));
});

function keepServerRunning() {
  server.listen(3000, () => {
    console.log("The server is now ready!");
  });
}

export default keepServerRunning;
