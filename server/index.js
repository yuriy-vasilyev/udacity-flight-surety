const http = require("http");
const app = require("./server.js");

const PORT = 3001;

const server = http.createServer(app);

server.listen(PORT);

console.log(`Server listening on port ${PORT}...`);
