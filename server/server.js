const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
require('./config/config');

var {mongoose} = require('./db/mongoose');
const express = require('express');
const port = process.env.PORT;
const app = express();
var server = http.createServer(app);

app.use(express.static(publicPath));

app.get('/new/:url*', (req, res) => {
  res.send({
    original_url: req.url,
    short_url: "some url"
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
