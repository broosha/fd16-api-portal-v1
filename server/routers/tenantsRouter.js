var  express = require('express')
   , DBConnector = require('../DBConnector')
   , router = express.Router()
   , mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req,res,next){
   db.Tenant.find( function(err, tenants){
      if (err) return next(err);
      res.json(tenants);
   });
});

router.post('/', function(req,res,next){
   var tenants = req.body;
   for(var i = 0; i < tenants.length; i++) {
      var tenant = tenants[i];
      db.Tenant.create( tenant , function(err,persistedTenant){
         if (err) return next(err);
         tenants[i] = persistedTenant;
      });
   }
   res.json(tenants);
});

// ADMIN FUNCTION: DELETE all tenants
router.delete('/',  function(req,res,next){
   db.Tenant.find().remove().exec();
   res.json('OK');
});

module.exports = router;