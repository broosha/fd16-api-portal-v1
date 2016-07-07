var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiSchema = Schema({
    apiUri: { type: String, required: true},
    description: { type: String, required: true}
    
    //TODO
});

module.exports = mongoose.model('api', apiSchema);