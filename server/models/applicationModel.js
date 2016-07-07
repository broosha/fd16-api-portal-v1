var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var applicationSchema = Schema({
    "appl-id": { type: String, required: true},
    shortname: { type: String, required: true},
    mailbox: { type: String, required: false}
});

module.exports = mongoose.model('application', applicationSchema);