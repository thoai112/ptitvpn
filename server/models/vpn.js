const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  Version: { type: String, unique: true, required: true },
  RealeaseNotes: { type: String, required: true},
  Servers: [{ type: Schema.Types.ObjectId, ref: 'Server' }],
  Networks: [{ type: Schema.Types.ObjectId, ref: 'Network' }],

});


module.exports = mongoose.model("Vpn", schema);

