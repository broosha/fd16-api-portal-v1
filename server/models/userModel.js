var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var userSchema = Schema({
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    mail: { type: String, required: true},
    tenant: { 
      type: Schema.Types.Number,
      ref: 'tenant',
      required: true
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'role' }]
});

module.exports = mongoose.model('user', userSchema);