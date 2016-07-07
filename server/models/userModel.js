var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    mail: { type: String, required: true}
});

module.exports = mongoose.model('user', userSchema);