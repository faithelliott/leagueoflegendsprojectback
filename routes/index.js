var express = require('express');
var router = express.Router();
var request = require('request');
var cors = require('cors')({origin: true});

var data = "";



router.get('/:id', function(req, res, next) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ req.params.id +'?api_key=RGAPI-05a90f72-a07b-4d8f-bcb3-0a8f938d84ab', { json: true }, (err, res, body) => {
    data = body; 
    data =JSON.stringify(data);
  });
 // res.render('index', {title1:  data.replace('<','')});
 res.send(data);
  console.log('test:'+data.json);
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
