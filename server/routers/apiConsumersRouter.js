var express = require('express'),
    DBConnector = require('../DBConnector'),
    router = express.Router(),
    mongoose = require('mongoose');

var db = new DBConnector();

router.get('/', function(req, res, next) {
    var apiId = req.params.apiId;

    db.ApiConsumer.find({api: apiId}).exec(function(err, apiConsumers) {
        if (err) return next(err);
        res.json(apiConsumers);
    });
});

router.post('/', function(req, res, next) {
    var apiConsumer = req.body;
    console.log(apiConsumer);
    db.ApiConsumer.create(apiConsumer, function(err, persistedApiConsumer) {
        if (err) return next(err);
        res.json(persistedApiConsumer);
    });
});

router.put('/:id', function(req, res, next) {
    var apiConsumerId = req.params.id;
    db.ApiConsumer.findById(apiConsumerId,function(err, apiConsumer){
      if (err) return next(err);
      if (!apiConsumer) return res.json('FEHLER: ApiConsumer mit ID: '+apiConsumerId+' nicht gefunden!');
      
      apiConsumer = req.body;
      
      apiConsumer.save(function(err){
         if (err) return next(err);
         res.json(apiConsumer);
      });  
      
    });
});

router.delete('/:id', function(req, res, next) {
    var apiConsumerId = req.params.id;
    db.ApiConsumer.findById(apiConsumerId).remove().exec();
    res.json('OK');
});

module.exports = router;