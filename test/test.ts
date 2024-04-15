import { createServer } from "node:http";

const server = createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello world!\n");
});

server.listen(8080, "127.0.0.1", () => {
  console.log("Listening on 127.0.0.1:8080");
});


