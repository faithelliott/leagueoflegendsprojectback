var express = require('express');
var router = express.Router();
var request = require('request');
var cors = require('cors')({origin: true});
require('dotenv').config();
console.log(process.env);

var userString ="";
var accId ="";
var api ='RGAPI-70f1d0e8-b272-452b-bb20-2019abde2e7f';

//gets basic account datas
router.get('/user/:id', function(req, res) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ req.params.id +'?api_key='+api, { json: true }, (err,apiRes,body) => {
    userString = body.id;
    accId = body.accId;
    console.log(userString);
    res.send(JSON.stringify(body));
  });
});

//gets akali data
router.get('/user/:id/:userString',function(req,res){
  request('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+req.params.userString+'/by-champion/84?api_key='+api,{json:true},(err,apiRes,body)=>{
  res.send(JSON.stringify(body));
  });
});

//gets akali match data
router.get('/match/:id/:accId',function(req,res){
request('https://na1.api.riotgames.com/lol/match/v4/matchlists/by-account/'+req.params.accId+'?champion=84&endIndex=10&beginIndex=0&api_key='+api,{json:true},(err,apiRes,body)=>{
 
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
