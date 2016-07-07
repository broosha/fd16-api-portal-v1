var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var tenantSchema = Schema({
    _id: String, // name
    description: { type: String, required: true}
});

module.exports = mongoose.model('tenant', tenantSchema);