// https://stackoverflow.com/questions/9542726/is-it-possible-to-base-36-encode-with-javascript-jquery

const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
require('./config/config');

const express = require('express');
const port = process.env.PORT;
const app = express();
app.use(express.static(publicPath));
var server = http.createServer(app);

var {mongoose} = require('./db/mongoose');
var {Site} = require('./db/models/sites');
const validator = require('validator');

app.get('/:site_code', (req, res) => {
  Site.findOne({site_code: req.params.site_code}).then((site) => {
    setTimeout(() => {
      if (!site) {
        return res.send({
          error: "The site does not exist in server."
        })
      }
      res.redirect("http://" + site.url);
    }, 1500);
  });
})

app.get('/new/:url*', (req, res) => {
  // !validator.isURL(req.params.url, {protocols: ['http'], require_protocol:true})
  if (!validator.isURL(req.params.url)) {
    return res.send({
      error: "The url is invalid."
    })
  };

  // Check if url exists in db
  Site.findOne({url: req.params.url}).then((url_doc) => {
    if (url_doc) {
      return res.send({
        original_url: url_doc.url,
        short_url: req.headers['host'] + "/" + url_doc.site_code
      });
    };

    var site_code = new Date().getTime().toString(36);
    Site.create({
      site_code,
      url: req.params.url
    });

    res.send({
      original_url: req.params.url,
      short_url: req.headers['host'] + "/" + site_code
    });
  });
});

server.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
