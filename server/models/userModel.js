var mongoose = require("mongoose")
  , Schema = mongoose.Schema;

var userSchema = Schema({
    _id: String, // E-Mail
    name: { type: String, required: true},
    lastname: { type: String, required: true},
    tenant: { 
      type: Schema.Types.String,
      ref: 'tenant',
      required: true
    },
    roles: [{ type: Schema.Types.ObjectId, ref: 'role' }]
});

module.exports = mongoose.model('user', userSchema);