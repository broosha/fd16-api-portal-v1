var express = require('express'),
    DBConnector = require('../DBConnector'),
    router = express.Router(),
    mongoose = require('mongoose'),
    uuid = require('node-uuid'),
    as = require('async');

var db = new DBConnector();

var addMAAMCredentials = function(apiConsumer){
    apiConsumer.authProvider["client-id"] = null;
    apiConsumer.authProvider["client-secret"] = null;
    apiConsumer.authProvider["api-key"] = null;
    
    switch(apiConsumer.authProvider["auth-provider-type"]) {
        case 'OAuth':
            var clientId = uuid.v1();
            var clientSecret = uuid.v4();
            apiConsumer.authProvider["client-id"] = clientId;
            apiConsumer.authProvider["client-secret"] = clientSecret;
            console.log("Added MAAM-Credentials for: "+apiConsumer.authProvider["auth-provider-type"]);
            break;
        case 'API-Key':
            var apiKey = uuid.v1();
            apiConsumer.authProvider["api-key"] = apiKey;
            console.log("Added MAAM-Credentials for: "+apiConsumer.authProvider["auth-provider-type"]);
            break;
    }
    
}


router.get('/', function(req, res, next) {
    var apiUrl = req.query.apiUrl.trim();

    db.ApiConsumer.find({api: apiUrl}).populate('application').exec(function(err, apiConsumers) {
        if (err) return next(err);
        res.json(apiConsumers);
    });
});

router.post('/', function(req, res, next) {
    
    var apiConsumer = req.body;
    
    addMAAMCredentials(apiConsumer);
    
    db.ApiConsumer.create(apiConsumer, function(err, persistedApiConsumer) {
        if (err) return next(err);
        res.json(persistedApiConsumer);
    });
});

router.put('/:id', function(req, res, next) {
    var apiConsumerId = req.params.id;
    
    as.series([
        function(callback){
            db.ApiConsumer.findById(apiConsumerId, function(err, apiConsumer){
              if (err) return next(err);
              if (!apiConsumer) return res.json('FEHLER: ApiConsumer mit ID: '+apiConsumerId+' nicht gefunden!');
              var prevType = apiConsumer._doc.authProvider["auth-provider-type"];
              callback(null, prevType);
            });
        }
    ],
    function(err, args){
        if(err) return next(err);
        var previousAuthProviderType = args[0];
        
        var newAuthProviderType = req.body.authProvider["auth-provider-type"];
        if(previousAuthProviderType != newAuthProviderType) {
          addMAAMCredentials(req.body);
        }
        
        db.ApiConsumer.findByIdAndUpdate(apiConsumerId, req.body, {new: true}, function(err, model) {
          console.log(err);
          console.log(model);
          if(err) return next(err);
          res.json(model);
        });
    });
    
});

router.delete('/:id', function(req, res, next) {
    var apiConsumerId = req.params.id;
    db.ApiConsumer.findById(apiConsumerId).remove().exec();
    res.json('OK');
});

module.exports = router;