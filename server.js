const http = require('http')
const app = require('./App')
const mongoose = require('./api/config/databaseConfig')
const port = process.env.PORT;

const server = http.createServer(app);
server.listen(port);

console.log(`Server listening on port --- ${port}`)

module.exports = { port, server }
