var express = require('express');
var router = express.Router();
var request = require('request');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/:id', function(req, res, next) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+req.params.id+'?api_key=RGAPI-54071df1-b43b-426b-b604-f121e27bed48', { json: false }, (err, res, body) => {
    if (err) { return console.log(err); }
    data = body;
    console.log(body.name);
    console.log(body.summonerLevel);
    console.log(body);  
    
  });
  res.render('index', { title1:  data});
  console.log('test:'+data);
});




request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/feith?api_key=RGAPI-5d6abf35-5d96-4f06-88fb-ff8259e5ae2c', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.name);
  console.log(body.summonerLevel);
  console.log(body);  
});

module.exports = router;
