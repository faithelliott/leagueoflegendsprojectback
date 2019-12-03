var express = require('express');
var router = express.Router();
var request = require('request');
var cors = require('cors')({origin: true});

var data = "";
var userString ="";
var akaliData="";
var api = "RGAPI-4bd84ca4-418a-4e81-9dc2-326cab67e719";

//gets basic account datas
router.get('/:id', function(req, res) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ req.params.id +'?api_key='+api, { json: true }, (err,apiRes,body) => {
    userString = body.id;
    console.log(userString);
    res.send(JSON.stringify(body));
  });
});

//gets akali data
router.get('/:id/:userString',function(req,res){
  request('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+req.params.userString+'/by-champion/84?api_key='+api,{json:true},(err,apiRes,body)=>{
  res.send(JSON.stringify(body));
  });
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
