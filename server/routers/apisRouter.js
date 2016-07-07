var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req,res,next){
   db.Api.find( function(err, apis){
      if (err) return next(err);
      res.json(apis);
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