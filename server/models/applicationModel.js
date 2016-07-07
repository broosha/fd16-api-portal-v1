var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var applicationSchema = Schema({
    "appl-id": { type: String, required: true},
    shortname: { type: String, required: true},
    mailbox: { type: String, required: false},
    tenant: { 
      type: Schema.Types.Number,
      ref: 'tenant',
      required: true
    }
});

module.exports = mongoose.model('application', applicationSchema);