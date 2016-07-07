var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var roleSchema = Schema({
    "role-name": { type: String, enum: ['CH-AXA-User', 'CH-AXA-Admin', 'FR-AXA-User', 'FR-AXA-Admin', 'CH-TWINT-User', 'Admin'], required: true}
});

module.exports = mongoose.model('user', roleSchema);