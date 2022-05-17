const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const schema = new Schema({
  //_id: {type: Number },
  Name: { type: String,unique: true ,required: true },
  Payload: { type: String },
  SNI: { type: String},
  Info: { type: String, required: true },
  isSSL: { type: String, required: true },
}
// {
//   _id : false,
// }
);


schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
//schema.plugin(AutoIncrement);


module.exports = mongoose.model("Network", schema);
