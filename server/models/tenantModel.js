var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var tenantSchema = Schema({
    _id: Number,
    name: { type: String, enum: ['CH-AXA', 'FR-AXA', 'CH-TWINT', 'PUBLIC'], required: true},
    description: { type: String, required: true}
});

module.exports = mongoose.model('tenant', tenantSchema);