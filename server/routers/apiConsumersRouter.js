var express = require('express'),
    DBConnector = require('../DBConnector'),
    router = express.Router(),
    mongoose = require('mongoose'),
    uuid = require('node-uuid');

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
    db.ApiConsumer.findById(apiConsumerId,function(err, apiConsumer){
      if (err) return next(err);
      if (!apiConsumer) return res.json('FEHLER: ApiConsumer mit ID: '+apiConsumerId+' nicht gefunden!');
      
      var lastAuthProviderType = apiConsumer._doc.authProvider["auth-provider-type"];
      var newAuthProviderType = req.body.authProvider["auth-provider-type"];
      
        apiConsumer._doc["rate-limit"] = req.body["rate-limit"];
        apiConsumer._doc["endpoint-url"] = req.body["endpoint-url"];
        apiConsumer._doc["authProvider"]["auth-provider-type"] = req.body["authProvider"]["auth-provider-type"];
        apiConsumer._doc["authProvider"]["oauth-scope"] = req.body["authProvider"]["oauth-scope"];
      
      if(lastAuthProviderType != newAuthProviderType) {
          addMAAMCredentials(apiConsumer._doc);
      }
      
       /* apiConsumer.update(
            { "rate-limit": req.body["rate-limit"] }, 
            { "endpoint-url": req.body["endpoint-url"] }, 
            { authProvider: req.body["authProvider"] }, 
            function (err, raw) {
                if(err) return console.log(err);
                console.log('The raw response from Mongo was ', raw);
            }); */
      
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