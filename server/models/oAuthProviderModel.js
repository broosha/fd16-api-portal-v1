var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var oAuthProviderSchema = Schema({
    oauth-scope: { type: [String], enum: ['b2c-axa-ch-basic', 'b2c-axa-ch-advanced', 'b2e-axa-ch', 'b2c-axa-fr-basic', 'b2c-axa-fr-advanced', 'b2e-axa-fr', 'b2b', 'other'], required: true},
    client-id: { type: String, required: true},
    client-secret: { type: String, required: false}
});

module.exports = mongoose.model('oAuthProvider', oAuthProviderSchema);