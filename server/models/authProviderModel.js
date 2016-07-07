var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var authProviderSchema = Schema({

    //TODO
});

module.exports = mongoose.model('authProvider', authProviderSchema);