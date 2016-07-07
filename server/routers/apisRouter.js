var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req,res,next){
   var visibility = req.params.visibility;
   
   if(!visibility){
      db.Api.find( function(err, apis){
         if (err) return next(err);
         res.json(apis);
      });   
   } else{
      db.Api.find({visibility: visibility}).exec(function(err, apis) {
         if (err) return next(err);
         res.json(apis);
      });
   }
   
});

router.get('/:id', function(req, res, next) {
    var apiId = req.params.id;
    db.Api.findById(apiId,function(err, api){
      if (err) return next(err);
      if (!api) return res.json('FEHLER: Api mit ID: '+apiId+' nicht gefunden!');
      res.json(api);
    });
});

router.post('/', function(req,res,next){
   var apis = req.body;
   for(var i = 0; i < apis.length; i++) {
      var api = apis[i];
      db.Api.create( api , function(err,persistedApi){
         if (err) return next(err);
         apis[i] = persistedApi;
      });
   }
   res.json(apis);
});

// ADMIN FUNCTION: DELETE all apis
router.delete('/',  function(req,res,next){
   db.Api.find().remove().exec();
   res.json('OK');
});

module.exports = router;