var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req,res,next){
   db.Application.find().populate('tenant').exec( function(err, applications){
      if (err) return next(err);
      res.json(applications);
   });
});

router.post('/', function(req,res,next){
   var applications = req.body;
   console.log(applications);
   for(var i = 0; i < applications.length; i++) {
      var application = applications[i];
      db.Application.create( application , function(err,persistedApplication){
         if (err) return next(err);
         applications[i] = persistedApplication;
      });
   }
   res.json(applications);
});

// ADMIN FUNCTION: DELETE all applications
router.delete('/',  function(req,res,next){
   db.Application.find().remove().exec();
   res.json('OK');
});

module.exports = router;