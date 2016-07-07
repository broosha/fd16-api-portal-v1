var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

console.log('!!!! Router = '+router);

router.get('/', function(req,res,next){
   db.Applications.find( function(err, applications){
      if (err) return next(err);
      res.json(applications);
   });
});

router.post('/', function(req,res,next){
    console.log(req.body);
   db.Applications.create( req.body , function(err,application){
      if (err) return next(err);
      res.json(application);
   });
});

module.exports = router;