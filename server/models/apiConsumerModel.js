var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var apiConsumerSchema = Schema({
    "rate-limit": { type: Number(), required: false},
    "endpoint-url": { type: String, required: true}
});

module.exports = mongoose.model('apiConsumer', apiConsumerSchema);