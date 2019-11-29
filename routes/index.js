var express = require('express');
var router = express.Router();
var request = require('request');


var data = "";

router.get('/:id', function(req, res, next) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ req.params.id +'?api_key=RGAPI-79635536-9e36-487e-80bc-bf945d9f9e6c', { json: true }, (err, res, body) => {
    data = body; 
  });
  res.render('index', {title1:  JSON.stringify(data)});
  console.log('test:'+data);
});

function ignoreFavicon(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    res.status(204).json({nope: true});
  } else {
    next();
  }
}

router.use(ignoreFavicon);
module.exports = router;
