let mongoose = require("mongoose");

let Owner = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, required: true },
});

module.exports = mongoose.model("Owner", Owner);
