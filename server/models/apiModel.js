var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiSchema = Schema({
    "api-uri": { type: String, required: true},
    description: { type: String, required: true},
    version: { type: Number, required: true},
    visibility: { type: [String], enum: ['CH-AXA', 'FR-AXA', 'CH-TWINT', 'PUBLIC'], required: true},
    "auth-provider-type": { type: String, enum: ['OAuth', 'Mutual SSL', 'API-Key', 'Public'], required: true},
    "swagger-doc": { type: String, required: false}
});

module.exports = mongoose.model('api', apiSchema);