var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiConsumerSchema = Schema({
    "rate-limit": { type: Number, required: false},
    "endpoint-url": { type: String, required: true},
    api: { 
      type: Schema.Types.String, // api-url
      ref: 'api',
      required: true
    },
    application: { 
      type: Schema.Types.String, // Appl-ID
      ref: 'application',
      required: true
    },
    authProvider: { 
      type: { type: String, enum: ['OAuth', 'Mutual SSL', 'API-Key', 'Public'], required: true},
      "api-key": { type: String, required: false},
      oAuthProvider: {
        "oauth-scope": { type: [String], enum: ['b2c-axa-ch-basic', 'b2c-axa-ch-advanced', 'b2e-axa-ch', 'b2c-axa-fr-basic', 'b2c-axa-fr-advanced', 'b2e-axa-fr', 'b2b', 'other'], required: true},
        "client-id": { type: String, required: true},
        "client-secret": { type: String, required: false}
      }
    }
});

module.exports = mongoose.model('apiConsumer', apiConsumerSchema);