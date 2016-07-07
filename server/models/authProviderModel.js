var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var authProviderSchema = Schema({
    type: { type: String, enum: ['OAuth', 'Mutual SSL', 'API-Key', 'Public'], required: true},
    "api-key": { type: String, required: false}
});

module.exports = mongoose.model('authProvider', authProviderSchema);