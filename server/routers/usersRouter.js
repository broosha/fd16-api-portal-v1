var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req,res,next){
   db.User.find( function(err, users){
      if (err) return next(err);
      res.json(users);
   });
});

router.post('/', function(req,res,next){
   var users = req.body;
   for(var i = 0; i < users.length; i++) {
      var user = users[i];
      db.User.create( user , function(err,persistedUser){
         if (err) return next(err);
         users[i] = persistedUser;
      });
   }
   res.json(users);
});

// ADMIN FUNCTION: DELETE all users
router.delete('/',  function(req,res,next){
   db.User.find().remove().exec();
   res.json('OK');
});

module.exports = router;