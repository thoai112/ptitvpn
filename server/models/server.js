const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  // serverid :{ type: String, unique: true, required: true },
  Name: { type: String, unique: true,required: true },
  FLAG: { type: String, required: true },
  ServerIP: { type: String, required: true },
  ServerPort: { type: String, required: true },
  SSLPort: { type: String, required: true },
  ProxyIP: { type: String, required: true },
  ProxyPort: { type: String, required: true },
  sInfo: { type: String },
  ServerUser: { type: String, required: true },
  ServerPass: { type: String, required: true },
  Type: { type: String, required: true },
});

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model("Server", schema);

