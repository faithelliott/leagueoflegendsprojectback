var express = require('express');
var router = express.Router();
var request = require('request');
var cors = require('cors')({origin: true});

var data = "";
var userString ="";
var akaliData="";

//gets basic account datas
router.get('/:id', function(req, res, next) {
  request('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/'+ req.params.id +'?api_key=RGAPI-05a90f72-a07b-4d8f-bcb3-0a8f938d84ab', { json: true }, (err, res, body) => {
    data = body; 
    data =JSON.stringify(data);
    userString = body.id;
    console.log(userString);

  });
 // res.render('index', {title1:  data.replace('<','')});
 res.send(data);
  console.log('test:'+data.json);
});

//gets akali data
router.get('/:id/:userString',function(req,res,next){
  request('https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/'+req.params.userString+'/by-champion/84?api_key=RGAPI-05a90f72-a07b-4d8f-bcb3-0a8f938d84ab',{json:true},(err,req,body)=>{
  akaliData = body;
  akaliData = JSON.stringify(akaliData);
  });
  res.send(akaliData);
  res.redirect(req.get('referer'));
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
