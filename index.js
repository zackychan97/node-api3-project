// code away!
const server = require('./server');
const port = 9000;

server.listen(port, () => {
    console.log(`\n The server is up and running on http://localhost:${port}, your majesty. \n`)
})
