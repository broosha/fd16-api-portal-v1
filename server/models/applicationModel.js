var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var applicationSchema = Schema({
    _id: String, // Appl-ID
    shortname: { type: String, required: true},
    mailbox: { type: String, required: false},
    tenant: { 
      type: Schema.Types.String,
      ref: 'tenant',
      required: true
    }
});

module.exports = mongoose.model('application', applicationSchema);