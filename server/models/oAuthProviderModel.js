var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var oAuthProviderSchema = Schema({

    //TODO
});

module.exports = mongoose.model('oAuthProvider', oAuthProviderSchema);