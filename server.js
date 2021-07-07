const express = require('express');

const server = express();
const userRoute = require('./users/userRouter');
const postRoute = require('./posts/postRouter');

// now we need our custom middleware
//3 amigas
function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`)
  next();
}
server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {}

server.use('/api/users', userRoute);
server.use('/api/posts', postRoute);

module.exports = server;
