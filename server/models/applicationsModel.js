var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var applicationSchema = Schema({
    applId: { type: String, required: true},
    shortname: { type: String, required: true},
    mailbox: { type: String, required: false}
});

var m  = mongoose.model('room', applicationSchema);
module.exports = m;