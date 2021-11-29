const server = require('./server');
const configuration = require('./config');

server.start(configuration.PORT);