require('dotenv').config();
var Promise = require('bluebird');
var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database-mongo/index');
var ebay = require('./ebayHelpers');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json({strict: false}));

app.get('/', () => res.render('index'));

app.get('/auctions', (req, res) => {
  Promise.all([
    db.Auction.find({})
      .lean(true)
      .limit(10)
      .exec(),
    db.Auction.find({})
      .select('itemId')
      .lean(true)
      .exec()
  ])
  .then(results => {
    console.log(`================>\n 
      server index 27: got ${results.length} results from db 
      \n<===============`);
    res.status(200).send(results);
  })
  .catch(err => {
    console.log(`================>\n 
      server index 31: error getting results from db 
      \n<===============`);
    res.sendStatus(500);
  });
});

app.post('/auctions', (req, res) => {
  db.saveAuction(req.body);
  res.status(201).send();
});

app.post('/search', (req, res) => {
  console.log('\n\nreq.body is: \n', req.body);
  ebay.search(req.body)
    .then(results => res.status(200).send(results))
    .catch(err => {
      console.log('Error searching: ', err);
      res.status(200).send('Error searching: ', err);
    })
});

// You must specify your AppID in the X-EBAY-SOA-SECURITY-APPNAME HTTP header 
// (or SECURITY-APPNAME URL parameter) of every request.

app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`); 
});

