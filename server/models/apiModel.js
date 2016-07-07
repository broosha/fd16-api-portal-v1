var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiSchema = Schema({
    _id: String, // api-uri
    description: { type: String, required: true},
    version: { type: Number, required: true},
    visibility: { type: [String], enum: ['CH-AXA', 'FR-AXA', 'CH-TWINT', 'PUBLIC'], required: true},
    "auth-provider-type": { type: [String], enum: ['OAuth', 'Mutual SSL', 'API-Key', 'Public'], required: true},
    "swagger-doc": { type: String, required: false},
    tenant: { type: Schema.Types.String, ref: 'tenant', required: true}
});

module.exports = mongoose.model('api', apiSchema);