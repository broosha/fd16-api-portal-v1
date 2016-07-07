var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiConsumerSchema = Schema({
    "rate-limit": { type: Number, required: false},
    "endpoint-url": { type: String, required: true},
    api: { 
      type: Schema.Types.ObjectId,
      ref: 'api',
      required: true
    },
    application: { 
      type: Schema.Types.ObjectId,
      ref: 'application',
      required: true
    },
    authProvider: { 
      type: Schema.Types.ObjectId,
      ref: 'authProvider',
      required: true
    }
});

module.exports = mongoose.model('apiConsumer', apiConsumerSchema);